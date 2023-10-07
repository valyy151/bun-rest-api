import server from 'bunrest'

import authRouter from './routes/auth'
import userRouter from './routes/users'

const app = server()

const port = 8080

app.use('/auth', authRouter)
app.use('/users', userRouter)

console.clear()

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
