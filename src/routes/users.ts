import server from 'bunrest'
import { PrismaClient } from '@prisma/client'

const router = server().router()

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
	const users = await prisma.user.findMany()

	res.status(200).json(users)
})

export default router
