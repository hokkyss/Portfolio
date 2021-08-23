import React, { useState } from "react";

import "tailwindcss/tailwind.css";
import styles from "./Navbar.module.css";

import { NavbarItem } from "@components/elements";

import LinkedIn from "@icons/linkedin.svg";
import Github from "@icons/github.svg";

export const Navbar = () => {
  const [githubColor, setGithubColor] = useState<string>("black");
  const [linkedinColor, setLinkedinColor] = useState<string>("black");

  return (
    <div className="nav w-screen flex flex-row justify-between items-center fixed">
      <div className={`nav flex flex-row ${styles.left}`}>
        <NavbarItem href="/">A</NavbarItem>
      </div>
      <div className={`nav flex flex-row-reverse ${styles.right}`}>
        <NavbarItem
          isA
          href="https://github.com/hokkyss"
          onMouseEnter={() => setGithubColor("aqua")}
          onMouseLeave={() => setGithubColor("black")}
        >
          <Github width="4vw" height="6vh" fill={githubColor} />
        </NavbarItem>
        <NavbarItem
          isA
          href="https://www.linkedin.com/in/hokkyss/"
          onMouseEnter={() => setLinkedinColor("aqua")}
          onMouseLeave={() => setLinkedinColor("black")}
        >
          <LinkedIn width="4vw" height="6vh" fill={linkedinColor} />
        </NavbarItem>
      </div>
    </div>
  );
};
