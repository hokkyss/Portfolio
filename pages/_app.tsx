import * as React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import axios from 'axios'

import '~/styles/globals.css'

import { Layout } from '~/layouts'
import '~/utils/firebase'

const activeLabelStyles = {
	transform: 'scale(0.85) translateY(-24px)',
}

export const theme = extendTheme({
	breakpoints: {
		xs: '25em',
	},
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false,
	},
	components: {
		Form: {
			variants: {
				'dark-floating': {
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
							backgroundColor: 'gray.800',
							pointerEvents: 'none',
							mx: 3,
							px: 1,
							my: 2,
							transformOrigin: 'left top',
						},
					},
				},
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
		chakra: '#38B2AC',
		css: '#563d7c',
		cuda: '#3a4e3a',
		dart: '#00b4ab',
		django: '#0C4B33',
		docker: '#384d54',
		fastapi: '#009485',
		firebase: '#F57C00',
		flask: '#000000',
		flutter: '#31B9F6',
		github: '#4183c4',
		gmail: '#ea4335',
		go: '#29beb0',
		haskell: '#5e5086',
		html: '#e34c26',
		http: '#005c9c',
		instagram: '#e1306c',
		java: '#b07219',
		javascript: '#efd81d',
		jinja: '#a52a22',
		jquery: '#0868ac',
		json: '#292929',
		jupyter: '#DA5B0B',
		kotlin: '#A97BFF',
		laravel: '#f05340',
		less: '#1d365d',
		linkedin: '#008cc9',
		makefile: '#427819',
		mariadb: '#003545',
		markdown: '#083fa1',
		matlab: '#e16737',
		mysql: '#00758F',
		nextjs: '#000000',
		nginx: '#009639',
		nodejs: '#68A063',
		numpy: '#9C8AF9',
		php: '#4f5d95',
		postgresql: '#008bb9',
		prisma: '#0c344b',
		procfile: '#3B2F63',
		prolog: '#74283c',
		python: '#3572A5',
		react: '#20232a',
		regex: '#009a00',
		sass: '#a53b70',
		scss: '#c6538c',
		svelte: '#ff3e00',
		svg: '#ff9900',
		swift: '#F05138',
		tailwincss: '#38BDF8',
		telegram: '#0088cc',
		tex: '#3D6117',
		typescript: '#2b7489',
		unity: '#222c37',
		vue: '#41b883',
		whatsapp: '#25d366',
		xml: '#0060ac',
		yaml: '#cb171e',
	},
})

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

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
