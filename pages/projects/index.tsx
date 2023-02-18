import * as React from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'

import { ProjectCard, UnderDevelopment, Markdown } from '~/components/modules'
import { getProjects } from '~/lib/common'
import { Time } from '~/constants/time'

const ProjectList: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	projects,
}) => {
	return (
		<React.Fragment>
			<Head>
				{/* <title>Projects · Hokki Suwanda</title> */}
				<meta name="description" content="See my content to the end!" />
			</Head>
			<Markdown>
				{`
# Hi 👋, I'm Hokki Suwanda a.k.a. hokkyss

### Software Engineer | Final Year Informatics Student

An undergraduate student full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities heartfully. Currently a penultimate Informatics/Computer Science student in Bandung Institute of Technology. Pursuing career as a software engineer. Used quite lot of tech stacks.


![Institut Teknologi Bandung](https://raster.shields.io/badge/-Institut%20Teknologi%20Bandung-00000000?labelColor=bbbbbb&color=005197&style=for-the-badge&logo=data:image/png;base64,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)
[![Portfolio](https://img.shields.io/badge/i--am.hokkyss.com-%230000FF?style=for-the-badge&logo=internetexplorer)](https://link.hokkyss.com/portfolio)

## :desktop_computer: Tech Stacks
### Languages
![C](https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white)
![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IndoaXRlIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiIgaGVpZ2h0PSIxZW0iIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTI3Ny43NCAzMTIuOWM5LjgtNi43IDIzLjQtMTIuNSAyMy40LTEyLjVzLTM4LjcgNy03Ny4yIDEwLjJjLTQ3LjEgMy45LTk3LjcgNC43LTEyMy4xIDEuMy02MC4xLTggMzMtMzAuMSAzMy0zMC4xcy0zNi4xLTIuNC04MC42IDE5Yy01Mi41IDI1LjQgMTMwIDM3IDIyNC41IDEyLjF6bS04NS40LTMyLjFjLTE5LTQyLjctODMuMS04MC4yIDAtMTQ1LjhDMjk2IDUzLjIgMjQyLjg0IDAgMjQyLjg0IDBjMjEuNSA4NC41LTc1LjYgMTEwLjEtMTEwLjcgMTYyLjYtMjMuOSAzNS45IDExLjcgNzQuNCA2MC4yIDExOC4yem0xMTQuNi0xNzYuMmMuMSAwLTE3NS4yIDQzLjgtOTEuNSAxNDAuMiAyNC43IDI4LjQtNi41IDU0LTYuNSA1NHM2Mi43LTMyLjQgMzMuOS03Mi45Yy0yNi45LTM3LjgtNDcuNS01Ni42IDY0LjEtMTIxLjN6bS02LjEgMjcwLjVhMTIuMTkgMTIuMTkgMCAwIDEtMiAyLjZjMTI4LjMtMzMuNyA4MS4xLTExOC45IDE5LjgtOTcuM2ExNy4zMyAxNy4zMyAwIDAgMC04LjIgNi4zIDcwLjQ1IDcwLjQ1IDAgMCAxIDExLTNjMzEtNi41IDc1LjUgNDEuNS0yMC42IDkxLjR6TTM0OCA0MzcuNHMxNC41IDExLjktMTUuOSAyMS4yYy01Ny45IDE3LjUtMjQwLjggMjIuOC0yOTEuNi43LTE4LjMtNy45IDE2LTE5IDI2LjgtMjEuMyAxMS4yLTIuNCAxNy43LTIgMTcuNy0yLTIwLjMtMTQuMy0xMzEuMyAyOC4xLTU2LjQgNDAuMkMyMzIuODQgNTA5LjQgNDAxIDQ2MS4zIDM0OCA0MzcuNHpNMTI0LjQ0IDM5NmMtNzguNyAyMiA0Ny45IDY3LjQgMTQ4LjEgMjQuNWExODUuODkgMTg1Ljg5IDAgMCAxLTI4LjItMTMuOGMtNDQuNyA4LjUtNjUuNCA5LjEtMTA2IDQuNS0zMy41LTMuOC0xMy45LTE1LjItMTMuOS0xNS4yem0xNzkuOCA5Ny4yYy03OC43IDE0LjgtMTc1LjggMTMuMS0yMzMuMyAzLjYgMC0uMSAxMS44IDkuNyA3Mi40IDEzLjYgOTIuMiA1LjkgMjMzLjgtMy4zIDIzNy4xLTQ2LjkgMCAwLTYuNCAxNi41LTc2LjIgMjkuN3pNMjYwLjY0IDM1M2MtNTkuMiAxMS40LTkzLjUgMTEuMS0xMzYuOCA2LjYtMzMuNS0zLjUtMTEuNi0xOS43LTExLjYtMTkuNy04Ni44IDI4LjggNDguMiA2MS40IDE2OS41IDI1LjlhNjAuMzcgNjAuMzcgMCAwIDEtMjEuMS0xMi44eiI+PC9wYXRoPjwvc3ZnPg==)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/python-888888?style=for-the-badge&logoColor=ffdd54&logo=data:image/png;base64,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)
![Dart](https://img.shields.io/badge/dart-%2313b9fd?style=for-the-badge&logo=dart&logoColor=%230175C2)
![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
![Kotlin](https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Frameworks, Platforms, and Libraries
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![Chakra UI](https://img.shields.io/badge/chakra%20UI-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1sb2dvcyIgd2lkdGg9IjMxLjg4IiBoZWlnaHQ9IjMyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjU2IDI1NyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJJY29uaWZ5SWQxODEzMDg4ZmUxZmJjMDFmYjQ2NiIgeDE9Ii0uODI4JSIgeDI9IjU3LjYzNiUiIHkxPSI3LjY1MiUiIHkyPSI3OC40MTElIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNDFEMUZGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQkQzNEZFIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Ikljb25pZnlJZDE4MTMwODhmZTFmYmMwMWZiNDY3IiB4MT0iNDMuMzc2JSIgeDI9IjUwLjMxNiUiIHkxPSIyLjI0MiUiIHkyPSI4OS4wMyUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkVBODMiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjguMzMzJSIgc3RvcC1jb2xvcj0iI0ZGREQzNSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0ZGQTgwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjYpIiBkPSJNMjU1LjE1MyAzNy45MzhMMTM0Ljg5NyAyNTIuOTc2Yy0yLjQ4MyA0LjQ0LTguODYyIDQuNDY2LTExLjM4Mi4wNDhMLjg3NSAzNy45NThjLTIuNzQ2LTQuODE0IDEuMzcxLTEwLjY0NiA2LjgyNy05LjY3bDEyMC4zODUgMjEuNTE3YTYuNTM3IDYuNTM3IDAgMCAwIDIuMzIyLS4wMDRsMTE3Ljg2Ny0yMS40ODNjNS40MzgtLjk5MSA5LjU3NCA0Ljc5NiA2Ljg3NyA5LjYyWiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjSWNvbmlmeUlkMTgxMzA4OGZlMWZiYzAxZmI0NjcpIiBkPSJNMTg1LjQzMi4wNjNMOTYuNDQgMTcuNTAxYTMuMjY4IDMuMjY4IDAgMCAwLTIuNjM0IDMuMDE0bC01LjQ3NCA5Mi40NTZhMy4yNjggMy4yNjggMCAwIDAgMy45OTcgMy4zNzhsMjQuNzc3LTUuNzE4YzIuMzE4LS41MzUgNC40MTMgMS41MDcgMy45MzYgMy44MzhsLTcuMzYxIDM2LjA0N2MtLjQ5NSAyLjQyNiAxLjc4MiA0LjUgNC4xNTEgMy43OGwxNS4zMDQtNC42NDljMi4zNzItLjcyIDQuNjUyIDEuMzYgNC4xNSAzLjc4OGwtMTEuNjk4IDU2LjYyMWMtLjczMiAzLjU0MiAzLjk3OSA1LjQ3MyA1Ljk0MyAyLjQzN2wxLjMxMy0yLjAyOGw3Mi41MTYtMTQ0LjcyYzEuMjE1LTIuNDIzLS44OC01LjE4Ni0zLjU0LTQuNjcybC0yNS41MDUgNC45MjJjLTIuMzk2LjQ2Mi00LjQzNS0xLjc3LTMuNzU5LTQuMTE0bDE2LjY0Ni01Ny43MDVjLjY3Ny0yLjM1LTEuMzctNC41ODMtMy43NjktNC4xMTNaIj48L3BhdGg+PC9zdmc+)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/Django-Rest%20Framework-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Databases
![Firebase](https://img.shields.io/badge/firebase-firestore-%23F57C00?style=for-the-badge&logo=firebase&labelColor=%23F57C000)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white)

### Others
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)


## :abacus: Stats
![Hokki Suwanda's Github Stats](https://github-readme-stats.vercel.app/api?username=hokkyss&count_private=true&show_icons=true&theme=transparent&border_radius=6)

![Hokki Suwanda's Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=hokkyss&theme=transparent)

## :phone: Contact
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](https://link.hokkyss.com/mail-me)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://link.hokkyss.com/ig)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://link.hokkyss.com/linkedin)`}
			</Markdown>
		</React.Fragment>
	)
}

export const getStaticProps: GetStaticProps<{
	projects: Project[]
}> = async (context) => {
	try {
		const projects = await getProjects()

		return {
			props: {
				projects: projects,
			},
			revalidate: (12 * Time.HOUR) / 1000, // 10 seconds or 12 hours
		}
	} catch {
		return {
			notFound: true,
		}
	}
}

export default ProjectList
