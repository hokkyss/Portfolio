import { NextApiHandler } from 'next'

const handler: NextApiHandler<{ detail: string }> = (req, res) => {
	return res.status(404).json({ detail: 'Not Found' })
}

export default handler
