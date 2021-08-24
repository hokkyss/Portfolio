import React, { useEffect, useState } from "react";

import { Box, IconText } from "@components/elements";
import { Subsection } from "@components/layouts";

import CSharp from "@icons/c-sharp.svg";
import C from "@icons/c.svg";
import CPP from "@icons/cpp.svg";
import CSS from "@icons/css3.svg";
import HTML from "@icons/html5.svg";
import Java from "@icons/java.svg";
import Javascript from "@icons/javascript.svg";
import Python from "@icons/python.svg";
import Typescript from "@icons/typescript.svg";

import ReactIcon from "@icons/react.svg";
import NextJS from "@icons/nextjs.svg";
import Django from "@icons/django-transparent.svg";
import Flask from "@icons/flask.svg";
import SWR from "@icons/swr.svg";
import Tailwind from "@icons/tailwind.svg";

export const TechStacks = (): JSX.Element => {
  return (
    <>
      <Subsection title="programmingLanguages">
        <Box>A</Box>
      </Subsection>
      <Subsection title="libraryAndFrameworks">
        <div>C</div>
        <div></div>
      </Subsection>
    </>
  );
};
