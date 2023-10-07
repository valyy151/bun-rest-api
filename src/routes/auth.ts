import server from 'bunrest'
import jwt from 'jsonwebtoken'
import { Request } from '../middleware/auth'
import authenticate from '../middleware/auth'
import { PrismaClient } from '@prisma/client'

const router = server().router()

const prisma = new PrismaClient()

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body as { email: string; password: string }

		if (!email || !password) {
			return res.status(400).json({ message: 'Please provide an email and password' })
		}

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!user) {
			return res.status(404).json({ message: 'Incorrect username or password' })
		}

		const match = await Bun.password.verify(password, user.password)

		if (!match) {
			return res.status(401).json({ message: 'Incorrect username or password' })
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

		res.status(200).json({ token })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'There was an error logging in' })
	}
})

router.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body as { email: string; password: string }

		if (!email || !password) {
			return res.status(400).json({ message: 'Please provide an email and password' })
		}

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

router.get('/validate', authenticate, async (req: Request, res) => {
	res.status(200).json({ userId: req.user!.id, message: 'Middleware is working' })
})

export default router
