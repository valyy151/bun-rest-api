import server from 'bunrest'
import { PrismaClient } from '@prisma/client'

const router = server().router()

const prisma = new PrismaClient()

router.post('/login', async (req, res) => {})

router.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body as { email: string; password: string }

		const hash = await Bun.password.hash(password)

		await prisma.user.create({
			data: {
				email,
				password: hash,
			},
		})

		res.status(201).json({ message: 'User created successfully' })
	} catch (e) {
		res.status(500).json({ message: 'There was an error creating the user' })
	}
})

export default router
