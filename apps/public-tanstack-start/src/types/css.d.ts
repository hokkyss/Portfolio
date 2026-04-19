// My css.d.ts file

declare module 'csstype' {
  interface Properties {
    [index: `--${string}`]: number | string;
  }
}
