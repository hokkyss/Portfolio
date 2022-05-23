/* eslint-disable @next/next/google-font-display */
import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript,
} from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return initialProps
	}

	render() {
		return (
			<Html>
				<Head>
					<meta name="application-name" content="hokkyss - Portfolio" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta
						name="apple-mobile-web-app-title"
						content="hokkyss - Portfolio"
					/>
					<meta name="description" content="Created by hokkyss" />
					{/* <meta name="format-detection" content="telephone=no" /> */}
					<meta name="mobile-web-app-capable" content="yes" />
					{/* <meta
						name="msapplication-config"
						content="/icons/browserconfig.xml"
					/> */}
					<meta name="msapplication-TileColor" content="#2B5797" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="theme-color" content="#000000" />

					<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="167x167"
						href="/apple-touch-icon.png"
					/>

					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/manifest.json" />
					{/* <link
						rel="mask-icon"
						href="/icons/safari-pinned-tab.svg"
						color="#5bbad5"
					/> */}
					<link rel="shortcut icon" href="/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>

					{/* <meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://twitter.com/hokkisuwanda" />
					<meta name="twitter:title" content="hokkyss - Portfolio" />
					<meta
						name="twitter:description"
						content="Best hokkyss - Portfolio in the world"
					/>
					<meta
						name="twitter:image"
						content="https://yourdomain.com/icons/android-chrome-192x192.png"
					/>
					<meta name="twitter:creator" content="@DavidWShadow" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="hokkyss - Portfolio" />
					<meta property="og:description" content="Best hokkyss - Portfolio in the world" />
					<meta property="og:site_name" content="hokkyss - Portfolio" />
					<meta property="og:url" content="https://yourdomain.com" />
					<meta
						property="og:image"
						content="https://yourdomain.com/icons/apple-touch-icon.png"
					/> */}
				</Head>
				<body>
					<Main />
				</body>
				<footer>
					<NextScript />
				</footer>
			</Html>
		)
	}
}

export default MyDocument
