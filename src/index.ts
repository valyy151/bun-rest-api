import server from 'bunrest'

import authRouter from './routes/auth'

const app = server()

const port = 8080

app.use('/auth', authRouter)

console.clear()

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
