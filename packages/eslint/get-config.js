import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import format from "eslint-plugin-format";
import { jsdoc } from "eslint-plugin-jsdoc";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

/**
 * @typedef {Object} MonorepoEslintOptions
 * @property {string} outDir Output directory. So eslint can correctly ignore
 * @property {boolean} tanstackRouter Enable tanstack router eslint config.
 * @property {boolean} tanstackQuery Enable tanstack query eslint config.
 * @property {boolean} react Enable react eslint config.
 * @property {string} tsconfigRootDir Root directory of tsconfig.json file
 * @property {"browser" | "node" | "isomorphic"} environment Eslint environment. Defaults to `isomorphic`
 */

/**
 *
 * @param {MonorepoEslintOptions} opts
 */
export default function getConfig(opts = {}) {
  /**
   * @type {Record<string, boolean>}
   */
  let eslintGlobal;
  if (typeof opts.environment === "undefined") {
    console.warn('[@portfolio/eslint] opts.environment not found, defaulting to "isomorphic"')
    opts.environment = "isomorphic";
  }
  if (opts.environment === "isomorphic") {
    eslintGlobal = globals["shared-node-browser"];
  } else if (opts.environment === "browser") {
    eslintGlobal = globals.browser;
  } else {
    eslintGlobal = globals.node;
  }

  /**
   * @type {boolean}
   */
  let isReactEnabled;
  if (typeof opts.react === "undefined") {
    console.warn('[@portfolio/eslint] opts.react not found, defaulting to false')
    opts.react = false;
  }
  isReactEnabled = opts.react;

  /**
   * @type {boolean}
   */
  let isTanstackRouterEnabled;
  if (typeof opts.tanstackRouter === "undefined") {
    console.warn('[@portfolio/eslint] opts.tanstackRouter not found, defaulting to false')
    opts.tanstackRouter = false;
  }
  isTanstackRouterEnabled = opts.tanstackRouter;

  /**
   * @type {boolean}
   */
  let isTanstackQueryEnabled;
  if (typeof opts.tanstackQuery === "undefined") {
    console.warn('[@portfolio/eslint] opts.tanstackQuery not found, defaulting to false')
    opts.tanstackQuery = false;
  }
  isTanstackQueryEnabled = opts.tanstackQuery;

  let resolvedOutputDirectory;
  if (typeof opts.outDir === "undefined") {
    throw new TypeError("[@portfolio/eslint] opts.outDir must be provided!");
  }
  resolvedOutputDirectory = opts.outDir;

  let resolvedTsconfigRootDir;
  if (typeof opts.tsconfigRootDir === "undefined") {
    throw new TypeError("[@portfolio/eslint] opts.tsconfigRootDir must be provided!");
  }
  resolvedTsconfigRootDir = opts.tsconfigRootDir;

  return defineConfig(
    { ignores: [resolvedOutputDirectory] },
    isTanstackRouterEnabled ? [{ ignores: ["**/routeTree.gen.ts"] }] : [],
    stylistic.configs.customize({
      jsx: isReactEnabled,
      arrowParens: true,
      blockSpacing: true,
      braceStyle: "1tbs",
      commaDangle: "always-multiline",
      pluginName: '@stylistic',
      indent: 2,
      semi: true,
      severity: "error",
      quoteProps: "as-needed",
      quotes: "single",
    }),
    eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
    jsdoc({
      config: "flat/recommended-typescript",
    }),
    {
      files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
      plugins: {
        "unused-imports": unusedImports,
      },
      rules: {
        "no-console": "error",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            args: "after-used",
            argsIgnorePattern: "^_",
            vars: "all",
            varsIgnorePattern: "^_",
          },
        ],
      },
    },
    {
      extends: [
        eslintJs.configs.recommended,
        tseslint.configs.recommendedTypeChecked,
        ...(isReactEnabled
          ? [eslintReact.configs["recommended-typescript"]]
          : []),
        ...(isReactEnabled ? [reactHooks.configs.flat.recommended] : []),
        ...(isReactEnabled ? [reactRefresh.configs.vite] : []),
      ],
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: eslintGlobal,
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: resolvedTsconfigRootDir,
        },
      },
      plugins: {
        ...(isReactEnabled ? { "react-hooks": reactHooks } : {}),
      },
      rules: {
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/only-throw-error": [
          "error",
          {
            allow: [
              ...(isTanstackRouterEnabled
                ? [
                    {
                      from: "package",
                      name: "Redirect",
                      package: "@tanstack/router-core",
                    },
                    {
                      from: "package",
                      name: "AnyRedirect",
                      package: "@tanstack/router-core",
                    },
                    {
                      from: "package",
                      name: "NotFoundError",
                      package: "@tanstack/router-core",
                    },
                  ]
                : []),
            ],
            allowRethrowing: true,
          },
        ],
      },
    },
    isTanstackQueryEnabled ? pluginQuery.configs["flat/recommended"] : [],
    isTanstackRouterEnabled ? pluginRouter.configs["flat/recommended"] : [],
    {
      extends: [perfectionist.configs["recommended-alphabetical"]],
      rules: {
        "perfectionist/sort-imports": [
          "error",
          {
            customGroups: { type: {}, value: {} },
            environment: "node",
            fallbackSort: { type: "unsorted" },
            groups: [
              "side-effect",
              "side-effect-style",
              "type",
              ["builtin", "external"],
              "internal-type",
              "internal",
              ["parent-type", "sibling-type", "index-type"],
              ["parent", "sibling", "index"],
              "object",
              "unknown",
            ],
            ignoreCase: false,
            maxLineLength: undefined,
            newlinesBetween: "ignore",
            order: "asc",
            partitionByComment: false,
            partitionByNewLine: true,
            /**
             * order matters in side effects
             */
            sortSideEffects: false,
            specialCharacters: "keep",
            type: "alphabetical",
          },
        ],
        "perfectionist/sort-objects": [
          "error",
          {
            type: "unsorted", // Don't sort objects passed to infiniteQueryOptions, etc
            useConfigurationIf: {
              callingFunctionNamePattern: [
                ...(isTanstackQueryEnabled
                  ? ["^queryOptions$", "^infiniteQueryOptions$", "^useMutation$"]
                  : []),
                ...(isTanstackRouterEnabled
                  ? [
                      "^createRootRouteWithContext",
                      "^createFileRoute",
                      "^createSerializationAdapter",
                    ]
                  : []),
              ],
            },
          },
        ],
      },
    },
    {
      files: ["**/*.toml"],
      languageOptions: {
        parser: format.parserPlain,
      },
      plugins: {
        format,
      },
      rules: {
        "format/dprint": [
          "error",
          { language: "toml", languageOptions: { indentWidth: 2 } },
        ],
      },
    },
    {
      files: ["**/*.xml", "**/*.svg"],
      languageOptions: {
        parser: format.parserPlain,
      },
      plugins: {
        format,
      },
      rules: {
        "format/prettier": [
          "error",
          {
            parser: "xml",
            plugins: ["@prettier/plugin-xml"],
          },
        ],
      },
    },
    {
      files: ["**/*.css"],
      languageOptions: {
        parser: format.parserPlain,
      },
      plugins: {
        format,
      },
      rules: {
        "format/prettier": [
          "error",
          {
            parser: "css",
          },
        ],
      },
    }
  );
}
