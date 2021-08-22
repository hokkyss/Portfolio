import React, { ReactNode } from "react";
import Link from "next/link";

import "tailwindcss/tailwind.css";
import styles from "./NavbarItem.module.css";

interface Props {
  children: ReactNode;
  href: string;
  isA?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export const NavbarItem = ({
  children,
  href,
  isA = false,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element => {
  return (
    <div
      className={`nav ${styles.item}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isA ? (
        <a href={href}>{children}</a>
      ) : (
        <Link href={href}>{children}</Link>
      )}
    </div>
  );
};
