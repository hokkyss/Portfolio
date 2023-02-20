import { getAuth } from 'firebase/auth'
import { NextMiddleware, NextResponse } from 'next/server'

import { initializeFirebaseClient } from './lib/common'

export const middleware: NextMiddleware = async function (req, event) {
	const firebaseApp = initializeFirebaseClient()
	const auth = getAuth(firebaseApp)

	if (!auth.currentUser) {
		const signInUrl = new URL('/signin', 'https://sso.hokkyss.com')
		signInUrl.searchParams.set('next', 'portfolio')

		return NextResponse.rewrite(signInUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*'],
}
