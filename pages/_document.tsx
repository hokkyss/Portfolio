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
				<Head />
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
