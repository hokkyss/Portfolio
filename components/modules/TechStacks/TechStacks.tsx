import React, { useEffect, useState } from "react";

import { Box, IconText, NormalBreak } from "@components/elements";
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

import ReactIcon from "@icons/react-svg.svg";
import NextJSIcon from "@icons/nextjs.svg";
import Django from "@icons/django-transparent.svg";
import Flask from "@icons/flask.svg";
import SWRLogo from "@icons/swr.svg";
import Tailwind from "@icons/tailwind.svg";

export const TechStacks = (): JSX.Element => {
  return (
    <>
      <Subsection title="programmingLanguages">
        <Box>
          <IconText Icon={CSharp} text="C#" />
          <IconText Icon={C} text="C" />
          <IconText Icon={CPP} text="C++" />
          <IconText Icon={CSS} text="CSS" />
          <IconText Icon={HTML} text="HTML" />
          <IconText Icon={Java} text="Java" />
          <IconText Icon={Javascript} text="Javascript" />
          <IconText Icon={Python} text="Python" />
          <IconText Icon={Typescript} text="Typescript" />
        </Box>
      </Subsection>
      <NormalBreak />
      <Subsection title="libraryAndFrameworks">
        <Box>
          <IconText Icon={ReactIcon} text="React" />
          <IconText Icon={NextJSIcon} text="NextJS" />
          <IconText Icon={Django} text="Django" />
          <IconText Icon={Flask} text="Flask" />
          <IconText Icon={SWRLogo} text="SWR" />
          <IconText Icon={Tailwind} text="Tailwind" />
        </Box>
      </Subsection>
    </>
  );
};
