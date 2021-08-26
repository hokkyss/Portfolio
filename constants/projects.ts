import { Project } from "@types";

export const projects: Project[] = [
  {
    name: "Rubik's Cube Solver",
    description:
      "Visualize and Solve your rubik's cube using A* algorithm. Built using Next.js.",
    preview: "/images/rubik-cube-solver.png",
    links: {
      page: "https://rubik-cube-solver.vercel.app/",
      github: "https://github.com/hokkyss/rubik-cube-solver",
    },
  },
  {
    name: "Chinese Remainder Solver",
    description:
      "Solve problems about chinese remainder theorem. Built using Next.js.",
    preview: "/images/crt-solver.jpg",
    links: {
      page: "https://chinese-remainder-solver.herokuapp.com",
      github: "https://github.com/hokkyss/Chinese-Remainder-Solver",
    },
  },
  {
    name: "Semi Github",
    description:
      "A clone of github with only some functionalities. Built using React.",
    preview: "/images/semi-github.png",
    links: {
      page: "https://semi-github-two.netlify.app/",
      github: "https://github.com/hokkyss/semi-github/tree/develop",
    },
  },
  {
    name: "OTOBOT",
    description:
      "A chatbot to save and display deadlines or times, such as date for final exam, or task deadline. Built using Flask, socketio, and sqlite3.",
    preview: "/images/otobot.jpg",
    links: {
      page: "https://otobotagenda.herokuapp.com",
      github: "https://github.com/hokkyss/Stima03_OTOBOT",
    },
  },
  /*
  {
    name: "Genshin Sekai",
    description:
      "A survival RPG made using prolog, a declarative programming language.",
    preview: "/images/logkom.jpg",
    links: {
      page: "",
      github: "https://github.com/hokkyss/LogKom",
    },
  },
  */
];
