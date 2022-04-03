import * as React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import '~/styles/globals.css'

import { Layout } from '~/layouts'

const activeLabelStyles = {
	transform: 'scale(0.85) translateY(-24px)',
}

export const theme = extendTheme({
	components: {
		Form: {
			variants: {
				floating: {
					container: {
						_focusWithin: {
							label: {
								...activeLabelStyles,
							},
						},
						'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
							{
								...activeLabelStyles,
							},
						label: {
							top: 0,
							left: 0,
							zIndex: 2,
							position: 'absolute',
							backgroundColor: 'white',
							pointerEvents: 'none',
							mx: 3,
							px: 1,
							my: 2,
							transformOrigin: 'left top',
						},
					},
				},
			},
		},
	},
	colors: {
		angular: '#b52e31',
		c: '#555555',
		'c#': '#178600',
		'c++': '#F34B7D',
		css: '#563d7c',
		cuda: '#3a4e3a',
		dart: '#00b4ab',
		django: '#0C4B33',
		docker: '#384d54',
		fastapi: '#009485',
		firebase: '#F57C00',
		github: '#4183c4',
		haskell: '#5e5086',
		html: '#e34c26',
		http: '#005c9c',
		java: '#b07219',
		javascript: '#f1e05a',
		jinja: '#a52a22',
		jquery: '#0868ac',
		json: '#292929',
		jupyter: '#DA5B0B',
		kotlin: '#A97BFF',
		laravel: '#f05340',
		less: '#1d365d',
		makefile: '#427819',
		markdown: '#083fa1',
		matlab: '#e16737',
		mysql: '#00758F',
		nginx: '#009639',
		nodejs: '#68A063',
		nextjs: '#000000',
		numpy: '#9C8AF9',
		php: '#4f5d95',
		prisma: '#0c344b',
		procfile: '#3B2F63',
		prolog: '#74283c',
		python: '#3572A5',
		react: '#282c34',
		regex: '#009a00',
		sass: '#a53b70',
		scss: '#c6538c',
		svelte: '#ff3e00',
		svg: '#ff9900',
		swift: '#F05138',
		tex: '#3D6117',
		typescript: '#2b7489',
		unity: '#222c37',
		vue: '#41b883',
		xml: '#0060ac',
		yaml: '#cb171e',
	},
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</React.Fragment>
	)
}

export default MyApp
