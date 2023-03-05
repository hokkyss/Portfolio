import { NextApiHandler } from 'next'

const handler: NextApiHandler = async function (req, res) {
	return res.status(503).end()
}

export default handler
