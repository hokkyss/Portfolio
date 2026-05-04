import { Config } from "eslint/config";

declare interface MonorepoEslintOptions {
    /**
     * Output directory for eslint to ignore
     */
    outDir: string;
    /**
     * Enable tanstack router eslint config.
     */
    tanstackRouter: string;
    /**
     * Enable tanstack query eslint config.
     */
    tanstackQuery: string;
    /**
     * Enable react eslint config.
     */
    react: string;
    /**
     * The globals environment that would like to be used.
     * 
     * @default "isomorphic"
     */
    environment?: "browser" | "node" | "isomorphic";
    /**
     * Root directory of tsconfig.json file
     */
    tsconfigRootDir: string;
}

export default function getConfig(opts: MonorepoEslintOptions): Config[];
