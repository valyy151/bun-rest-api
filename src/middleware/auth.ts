import jwt from 'jsonwebtoken'
import { BunRequest } from 'bunrest/src/server/request'
import { BunResponse } from 'bunrest/src/server/response'

export type Request = BunRequest & {
	user?: jwt.JwtPayload
}

export default function authenticate(req: Request, res: BunResponse, next: ((err?: Error) => {}) | undefined) {
	const token = req.headers!['token']

	if (!token) {
		return res.status(401).json({ msg: 'UNAUTHORIZED' })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload
		req.user = decoded
		next!()
	} catch (err) {
		res.status(401).json({ msg: 'UNAUTHORIZED' })
	}
}
