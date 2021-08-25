import React, { useState } from "react";

import styles from "./Navbar.module.css";

import { NavbarItem } from "@components/elements";
import Props from "@types";

import LinkedIn from "@icons/linkedin.svg";
import Github from "@icons/github.svg";
import Email from "@icons/email.svg";
import Gmail from "@icons/gmail.svg";

type GithubColor = "black" | "aqua";
type LinkedInColor = "black" | "#0A66C2";
type MailIcon = "email" | "gmail";

export const Navbar = ({
  aboutRef,
  projectRef,
  expRef,
  interestRef,
}: Props.NavbarProps) => {
  const [githubColor, setGithubColor] = useState<GithubColor>("black");
  const [linkedinColor, setLinkedinColor] = useState<LinkedInColor>("black");
  const [mailIcon, setMailIcon] = useState<MailIcon>("email");

  const scrollToAbout = (): void => aboutRef.current?.scrollIntoView();
  const scrollToProjects = (): void => projectRef.current?.scrollIntoView();
  const scrollToExperiences = (): void => expRef.current?.scrollIntoView();
  const scrollToInterests = (): void => interestRef.current?.scrollIntoView();

  return (
    <div className="nav w-screen flex flex-row justify-between items-center fixed">
      <div className={`nav flex flex-row ${styles.left}`}>
        <NavbarItem component="button" onClick={scrollToAbout} href="/">
          About
        </NavbarItem>
        <NavbarItem component="button" onClick={scrollToProjects} href="/">
          Projects
        </NavbarItem>
        <NavbarItem component="button" onClick={scrollToExperiences} href="/">
          Exp.
        </NavbarItem>
        <NavbarItem component="button" onClick={scrollToInterests} href="/">
          Interest
        </NavbarItem>
      </div>
      <div className={`nav flex flex-row-reverse ${styles.right}`}>
        <NavbarItem
          component="a"
          // send email to
          href="mailto:hokkyss23@gmail.com"
          onMouseEnter={() => setMailIcon("gmail")}
          onMouseLeave={() => setMailIcon("email")}
        >
          {mailIcon === "email" ? (
            <Email width="4vw" height="6vh" />
          ) : (
            <Gmail width="4vw" height="6vh" />
          )}
        </NavbarItem>
        <NavbarItem
          component="a"
          href="https://github.com/hokkyss"
          onMouseEnter={() => setGithubColor("aqua")}
          onMouseLeave={() => setGithubColor("black")}
        >
          <Github width="4vw" height="6vh" fill={githubColor} />
        </NavbarItem>
        <NavbarItem
          component="a"
          href="https://www.linkedin.com/in/hokkyss/"
          onMouseEnter={() => setLinkedinColor("#0A66C2")}
          onMouseLeave={() => setLinkedinColor("black")}
        >
          <LinkedIn width="4vw" height="6vh" fill={linkedinColor} />
        </NavbarItem>
      </div>
    </div>
  );
};
