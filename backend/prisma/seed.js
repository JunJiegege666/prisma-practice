const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // const user = await prisma.user.create({
    //     data: {
    //         userName: 'cba',
    //         password: 'eeeee',
    //         nickName: '管理员',
    //         address: 'assa',
    //         email: '1ssw11111@qq.com',
    //     }
    // })
    // const post = await prisma.post.create({
    //     data: {
    //         title: 'prisma开发指南',
    //         desc: '0',
    //         content: '巴拉巴拉巴拉'
    //     }
    // })

    const taskUser1 = await prisma.TaskUser.create({
        data: {
            userName: 'xiaoming',
            password: '111111',
            email: '111@qq.com',
        }
    })
}

main().catch(e => {
    console.error(e)
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect()
})