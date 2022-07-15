import { NextMiddleware, NextResponse } from 'next/server'
import { canLogin } from './utils/canLogin'

export const middleware: NextMiddleware = async (req, ev) => {
	if (req.nextUrl.pathname.startsWith('/admin') && canLogin()) {
		const loginUrl = new URL('/admin/login', req.url)
		loginUrl.searchParams.set('next', req.nextUrl.pathname)

		return NextResponse.redirect(loginUrl)
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/((?!login).*)'],
}
