/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image as ChakraImage } from '@chakra-ui/react'
import * as React from 'react'
import { IconBaseProps, IconType } from 'react-icons'
import {
	FaAngular,
	FaCss3,
	FaDocker,
	FaGithub,
	FaHtml5,
	FaJava,
	FaJs,
	FaLaravel,
	FaLess,
	FaMarkdown,
	FaNodeJs,
	FaPhp,
	FaPython,
	FaReact,
	FaSass,
	FaUnity,
	FaVuejs,
} from 'react-icons/fa'
import {
	SiChakraui,
	SiCsharp,
	SiDart,
	SiDjango,
	SiExpress,
	SiFastapi,
	SiFirebase,
	SiFlask,
	SiFlutter,
	SiGo,
	SiHaskell,
	SiHeroku,
	SiJinja,
	SiJquery,
	SiJupyter,
	SiKotlin,
	SiLatex,
	SiMariadb,
	SiMongodb,
	SiMysql,
	SiNextdotjs,
	SiNginx,
	SiNumpy,
	SiPostgresql,
	SiPrisma,
	SiSvelte,
	SiSvg,
	SiSwift,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si'
import { VscJson, VscRegex, VscCode } from 'react-icons/vsc'

// 		c: '#555555',
// 		'c++': '#f34b7d',
// 		cuda: '#3a4e3a',
// 		http: '#005c9c',
// 		makefile: '#427819',
// 		matlab: '#e16737',
// 		prolog: '#74283c',
// 		scss: '#c6538c',
// 		xml: '#0060ac',
// 		yaml: '#cb171e',
export const Icons: Record<TagType, IconType> = {
	angular: FaAngular,
	c: VscCode,
	'c#': SiCsharp,
	'c++': VscCode,
	chakra: SiChakraui,
	css: FaCss3,
	cuda: VscCode,
	dart: SiDart,
	django: SiDjango,
	docker: FaDocker,
	express: SiExpress,
	fastapi: SiFastapi,
	firebase: SiFirebase,
	flask: SiFlask,
	flutter: SiFlutter,
	github: FaGithub,
	go: SiGo,
	haskell: SiHaskell,
	html: FaHtml5,
	http: VscCode,
	java: FaJava,
	javascript: FaJs,
	jinja: SiJinja,
	jquery: SiJquery,
	json: VscJson,
	jupyter: SiJupyter,
	kotlin: SiKotlin,
	laravel: FaLaravel,
	less: FaLess,
	makefile: VscCode,
	mariadb: SiMariadb,
	markdown: FaMarkdown,
	matlab: VscCode,
	mongodb: SiMongodb,
	mysql: SiMysql,
	nextjs: SiNextdotjs,
	nginx: SiNginx,
	nodejs: FaNodeJs,
	numpy: SiNumpy,
	php: FaPhp,
	postgresql: SiPostgresql,
	prisma: SiPrisma,
	procfile: SiHeroku,
	prolog: VscCode,
	python: FaPython,
	react: FaReact,
	regex: VscRegex,
	sass: FaSass,
	scss: VscCode,
	svelte: SiSvelte,
	svg: SiSvg,
	swift: SiSwift,
	tailwindcss: SiTailwindcss,
	tex: SiLatex,
	typescript: SiTypescript,
	unity: FaUnity,
	ubiquity: function (props: IconBaseProps) {
		const { children, size, color, display, ...rest } = props
		return (
			<ChakraImage
				boxSize={size ?? '1em'}
				display="inline-block"
				lineHeight="1em"
				flexShrink={0}
				color={color ?? 'currentcolor'}
				verticalAlign="top"
				marginInlineEnd="0.5em"
				src="icons/Ubiquity.png"
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				{...(rest as any)}
			/>
		)
	},
	vue: FaVuejs,
	xml: VscCode,
	yaml: VscCode,
}
