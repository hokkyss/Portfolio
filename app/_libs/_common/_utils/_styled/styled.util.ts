import type React from 'react';
import type { CSSProperties, LegacyRef, ReactNode, Ref } from 'react';
import type { ClassNameValue } from 'tailwind-merge';

import { createElement, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type StylableComponent<
  // NOTE: ref can be anything
  T extends { className?: string; ref?: unknown; style?: CSSProperties } = {
    className?: string;
    ref?: unknown;
    style?: CSSProperties;
  },
> = (props: T) => ReactNode;

type IntrinsicElement = Exclude<keyof React.JSX.IntrinsicElements, 'object' | 'symbol'>;

type InferPropType<P> = P extends StylableComponent<infer U>
  ? U
  : P extends keyof React.JSX.IntrinsicElements
  ? React.JSX.IntrinsicElements[P]
  : { className?: string; style?: CSSProperties };

type InferComponentRef<P> = 'ref' extends keyof P
  ? P['ref'] extends LegacyRef<infer U> | Ref<infer U> | undefined
    ? U
    : unknown
  : unknown;

type ClassNames<PropType> = ((props: PropType) => ClassNameValue) | ClassNameValue;

function styled<Element extends IntrinsicElement>(
  element: Element,
): <Props = React.JSX.IntrinsicElements[Element]>(
  ...classNames: ClassNames<Props>[]
) => ReturnType<typeof forwardRef<InferComponentRef<Props>, Props>>;

function styled<Element extends StylableComponent>(
  element: Element,
): <Props = InferPropType<typeof element>>(
  ...classNames: ClassNames<Props>[]
) => ReturnType<typeof forwardRef<InferComponentRef<Props>, Props>>;

function styled<Element extends IntrinsicElement | StylableComponent>(element: Element) {
  return <Props = InferPropType<typeof element>>(...classNames: ClassNames<Props>[]) =>
    forwardRef<InferComponentRef<Props>, Props>((props, ref) =>
      createElement(element, {
        ...props,
        className: twMerge(
          ...classNames.map((cls) => (typeof cls === 'function' ? cls(props) : cls)),
          (props as { className?: string }).className,
        ),
        ref,
      }),
    );
}

export default styled;
