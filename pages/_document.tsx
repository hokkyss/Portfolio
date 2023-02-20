import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta
						name="description"
						content="I'm Hokki Suwanda (hokkyss), a fullstack software engineer. I am an informatics penultimate student in Bandung Institute of Technology. An undergraduate student full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities heartfully. Currently a penultimate Informatics/Computer Science student in Bandung Institute of Technology. Pursuing career as a software engineer. Used quite lot of tech stacks."
					/>
					<meta name="application-name" content="hokkyss" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content="hokkyss" />
					{/* <meta name="format-detection" content="telephone=no" /> */}
					<meta name="mobile-web-app-capable" content="yes" />
					{/* <meta
						name="msapplication-config"
						content="/browserconfig.xml"
					/> */}
					<meta name="msapplication-TileColor" content="#2B5797" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="theme-color" content="#000000" />
					<link rel="apple-touch-icon" href="/touch-icon-iphone.png" />
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
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
					{/* <link
						rel="mask-icon"
						href="/safari-pinned-tab.svg"
						color="#5bbad5"
					/> */}
					<link rel="shortcut icon" href="/favicon.ico" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://twitter.com/hokkisuwanda" />
					<meta name="twitter:title" content="hokkyss" />
					<meta
						name="twitter:description"
						content="I'm Hokki Suwanda (hokkyss), a fullstack software engineer. I am an informatics penultimate student in Bandung Institute of Technology. An undergraduate student full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities heartfully. Currently a penultimate Informatics/Computer Science student in Bandung Institute of Technology. Pursuing career as a software engineer. Used quite lot of tech stacks."
					/>
					<meta
						name="twitter:image"
						content="https://i-am.hokkyss.com/android-chrome-192x192.png"
					/>
					<meta name="twitter:creator" content="@hokkyss" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="hokkyss | Hokki Suwanda" />
					<meta
						property="og:description"
						content="I'm Hokki Suwanda (hokkyss), a fullstack software engineer. I am an informatics penultimate student in Bandung Institute of Technology. An undergraduate student full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities heartfully. Currently a penultimate Informatics/Computer Science student in Bandung Institute of Technology. Pursuing career as a software engineer. Used quite lot of tech stacks."
					/>
					<meta property="og:site_name" content="hokkyss" />
					<meta property="og:url" content="https://i-am.hokkyss.com" />
					<meta
						property="og:image"
						content="https://i-am.hokkyss.com/apple-touch-icon.png"
					/>
				</Head>
				<body>
					<ColorModeScript initialColorMode="dark" />
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
