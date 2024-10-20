const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient();

app.post('/users', async (req, res) => {
    // console.log(req.body)
    const { userName, password, email, nickName, address } = req.body
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
                email,
                address,
                nickName
            }
        })
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})
// 获取所有用户
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 更新用户
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { userName, password, email, nickName, address } = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                userName,
                password,
                email,
                address,
                nickName
            }
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


// 删除用户
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // 返回204 No Content状态
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getuser/:id', async (req, res) => {
    const { id } = req.params
    try {
        const postWithUser = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                user: true
            },
        })
        if (postWithUser) {
            console.log('Post:', postWithUser);
            console.log('User who created the post:', postWithUser.user);
        } else {
            console.log('Post not found');
        }
    } catch (error) {
        console.log('Post not found');
    } finally {
        await prisma.$disconnect();
    }
})

app.get('/user/:userId/posts', async (req, res) => {
    const { userId } = req.params; // 获取请求参数中的用户 ID
    try {
        // 查询特定用户及其发表的所有帖子
        const userWithPosts = await prisma.user.findUnique({
            where: {
                id: parseInt(userId), // 根据用户 ID 查找用户
            },
            include: {
                posts: true, // 包含用户的所有帖子
            },
        });

        if (userWithPosts) {
            // 找到用户及其帖子，返回 JSON 响应
            res.status(200).json({
                user: userWithPosts,
                posts: userWithPosts.posts, // 返回该用户的所有帖子
            });
        } else {
            // 用户未找到，返回 404 状态和错误消息
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // 处理错误并返回 500 状态
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user posts' });
    } finally {
        await prisma.$disconnect(); // 断开 Prisma 连接
    }
});

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        // 查找用户
        const user = await prisma.user.findUnique({
            where: { userName }
        });

        // 如果用户不存在，返回错误
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 发布任务
app.post('/tasks', async (req, res) => {

    const { title, description, userId } = req.body; // userId 为发布者 
    console.log(req.body)
    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                creatorId: parseInt(userId),  // 用户 A 发布的任务
                status: 'PENDING' // 初始状态为待处理
            }
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
// 查看任务
app.get('/tasks/hall', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                status: 'PENDING' // 只显示待处理的任务
            },
            include: {
                creator: true // 包含发布者信息
            }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 接任务
app.post('/tasks/:taskId/assign', async (req, res) => {
    const { taskId } = req.params; // 任务 ID
    const { userId } = req.body;   // 用户 B 的 ID，接单用户

    try {
        // 查询任务是否已被抢
        const task = await prisma.task.findUnique({
            where: { id: parseInt(taskId) }
        });

        if (!task || task.assigneeId) {
            return res.status(400).json({ error: "任务已经被抢或不存在。" });
        }

        // 更新任务状态为进行中，并记录接单用户
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: {
                assigneeId: parseInt(userId),
                status: 'IN_PROGRESS'
            }
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on http://139.159.205.182:${PORT}`);
});

