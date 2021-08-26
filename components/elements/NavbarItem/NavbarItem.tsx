import React, { ReactNode } from "react";
import Link from "next/link";

import styles from "./NavbarItem.module.css";

interface NavbarItemProps {
  children: ReactNode;
  href: string;
  component?: "a" | "Link" | "button";
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NavbarItem = ({
  children,
  href,
  component = "Link",
  onMouseEnter,
  onMouseLeave,
  onClick,
}: NavbarItemProps): JSX.Element => {
  return (
    <div
      className={`nav ${styles.item} text-small`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {component === "a" ? (
        <a style={{ color: "red" }} href={href}>
          {children}
        </a>
      ) : component === "Link" ? (
        <Link href={href}>{children}</Link>
      ) : (
        <button onClick={onClick}>{children}</button>
      )}
    </div>
  );
};
