/**
 * Set all properties of an object to be required
 */
// type Required<T> = {
//   [P in keyof T]-?: T[P];
// };

/**
 * Recursively set all properties of an object to be optional
 */
export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P] extends null | object
      ? DeepPartial<T[P]> | null
      : T[P] extends null | object | undefined
        ? DeepPartial<T[P]> | null
        : T[P];
};

export type Except<T, K extends keyof T> = Omit<T, K>;

/**
 * Self explanatory
 */
export declare type EmptyObject = Record<string, never>;

/**
 * Self explanatory
 */
export declare type AnyObject = Record<never, never>;

/**
 * Self explanatory
 *
 * @example
 *
 * ```ts
 * type AnyAndNumber = Equals<any, number>; //false
 * ```
 *
 * @see https://github.com/Microsoft/TypeScript/issues/27024
 * @see https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same
 */
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

/**
 * Check if a Key exists in an object
 * @example
 *
 * ```ts
 * interface WithAny {
 *   first: any;
 *   second: number;
 * }
 *
 * type FirstInWithAny = KeyIn<"first", WithAny> // true
 * type SecondInWithAny = KeyIn<"second", WithAny> // true
 * type ThirdInWithAny = KeyIn<"third", WithAny> // false
 * ```
 */
export type KeyIn<Key, Type extends object> = Key extends keyof Type ? true : false;

/**
 * Return the keys that both T and U have.
 */
export type CommonProperties<T, U> = keyof T & keyof U;

/**
 * Change keys with undefined type to be optional instead.
 *
 * @example
 *
 * ```ts
 * type Foo = {
 *   x: string | undefined; // required, but can be undefined
 * };
 *
 * type Bar = UndefinedToOptional<Foo>; // { x?: string | undefined }
 * ```
 */
export type UndefinedToOptional<T> = {
  [Key in keyof T as undefined extends T[Key] ? Key : never]?: T[Key];
} & {
  [Key in keyof T as undefined extends T[Key] ? never : Key]-?: T[Key];
};

/**
 * Intersects two objects recursively.
 * Readonly modifier will be treated as if there is no readonly modifier.
 * @example
 *
 * ```ts
 * type Foo = {
 *   v: string | null;
 *   x: number;
 *   y: any;
 *   z?: string;
 * };
 *
 * type Bar = {
 *   v: string;
 *   x: number;
 *   y: string;
 *   z?: string;
 * };
 *
 * type FooBar = Intersect<Foo, Bar> // { v: string; x: number; y: string; z: string | undefined; }
 * // {
 * //    v: string;
 * //    x: number;
 * //    y: string;
 * //    z: string | undefined; // is now required
 * // }
 * ```
 */
export declare type Intersect<ObjectOne, ObjectTwo> = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // take common properties
  // if the value is null or undefined (or both), don't take the key.
  // if the value are of equal, take the key
  // if one of the value is any, take the other value
  // if neither is any, take the value by &
  // if not, check:
  // if they are both objects, take the key to be intersected recursively
  // if not, don't take it.
  [P in CommonProperties<ObjectOne, ObjectTwo> as Equals<ObjectOne[P], ObjectTwo[P]> extends true
    ? P
    : ObjectOne[P] extends object
      ? ObjectTwo[P] extends object
        ? P
        : never
      : ObjectOne[P] extends ObjectTwo[P]
        ? P
        : ObjectTwo[P] extends ObjectOne[P]
          ? P
          : never]: Equals<ObjectOne[P], any> extends true
    ? ObjectTwo[P]
    : Equals<ObjectTwo[P], any> extends true
      ? ObjectOne[P]
      : ObjectOne[P] extends object
        ? ObjectTwo[P] extends object
          ? Intersect<ObjectOne[P], ObjectTwo[P]>
          : never
        : ObjectOne[P] & ObjectTwo[P];
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Take only the methods of an object
 */
export type Methods<T> = {
  [P in keyof T as T[P] extends (...args: unknown[]) => unknown ? P : never]: T[P];
};

/**
 * Take only the properties of an object
 */
export type Properties<T> = Omit<T, keyof Methods<T>>;

/**
 * Make at least one of the properties chosen to be required.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number;
 *   y: number;
 *   z: number;
 * };
 *
 * const Bar: RequireAtLeastOne<Foo, 'x' | 'y'> = {
 *   z: 5;
 * }; // error because either x or y is not defined
 *
 * const Bar: RequireAtLeastOne<Foo, 'x' | 'y'> = {
 *   x: 1;
 *   z: 5;
 * }; // ok
 * ```
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = {
  [Key in Keys]-?: Required<Pick<T, Key>> & Partial<Pick<T, Exclude<Keys, Key>>>;
}[Keys] &
  Except<T, Keys>;

/**
 * Make at least one of the properties chosen to be required.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number;
 *   y: number;
 *   z: number;
 * };
 *
 * const Bar: RequireOne<Foo, 'x' | 'y'> = {
 *   x: 1;
 *   z: 5;
 * }; // ok
 *
 * const Bar: RequireOne<Foo, 'x' | 'y'> = {
 *   x: 1;
 *   y: 2;
 *   z: 5;
 * }; // error
 * ```
 */
export type RequireOne<T, Keys extends keyof T = keyof T> = {
  [Key in Keys]-?: Required<Pick<T, Key>>;
}[Keys] &
  Except<T, Keys>;

/**
 * Make all chosen properties to be required.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x?: number;
 *   y?: number;
 *   z: number;
 * };
 *
 * type RequiredFoo = SetRequired<Foo, "x" | "y">; { x: number; y: number; z: number }
 * type RequiredFoo = SetRequired<Foo, "x">; { x: number; y?: number; z: number }
 * ```
 */
export type SetRequired<T, Keys extends keyof T> = Required<Pick<T, Keys>> & Except<T, Keys>;

/**
 * Make all chosen properties to be optional.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number;
 *   y: number;
 *   z: number;
 * };
 *
 * type Bar = SetOptional<Foo, "x" | "y">; // { x?: number; y?: number; z: number }
 * type FooBar = SetOptional<Foo, "y">; // { x: number; y?: number; z: number }
 * ```
 */
export type SetOptional<T, Keys extends keyof T = keyof T> = {
  [Key in Keys]?: T[Key];
} & Except<T, Keys>;

/**
 * Require all chosen properties or nothing.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number;
 *   y: number;
 *   z: number;
 * };
 *
 * const Bar: RequireAllOrNone<Foo, 'x' | 'y'> = {
 *   x: 1;
 *   y: 2;
 *   z: 5;
 * }; // ok
 *
 * const Bar: RequireAllOrNone<Foo, 'x' | 'y'> = {
 *   z: 5;
 * }; // ok
 *
 * const Bar: RequireAllOrNone<Foo, 'x' | 'y'> = {
 *   x: 1;
 *   z: 5;
 * }; // error
 * ```
 */
export type RequireAllOrNone<T, Keys extends keyof T = keyof T> = (
  | Partial<Record<Keys, never>>
  | Required<Pick<T, Keys>>
) &
  Except<T, Keys>;

/**
 * Make chosen properties NonNullable.
 */
export type SetNonNullable<T, Keys extends keyof T = keyof T> = {
  [Key in Keys]: NonNullable<T[Key]>;
} & Except<T, Keys>;

/**
 * Make chosen properties unassignable.
 *
 * @example
 * ```ts
 * type Foo = {
 *   x: number;
 *   y: number;
 *   z: number;
 * };
 *
 * const bar: SetNever<Foo, "x"> = { x: 5, y: 1, z: 2 }; // error
 * const bar: SetNever<Foo, "x"> = { y: 1, z: 2 }; // ok
 * ```
 */
export type SetNever<T, Keys extends keyof T> = {
  [Key in Keys]: never;
} & Except<T, Keys>;

/**
 * @example
 *
 * ```ts
 * const generateRandomNumber = async () => Math.random();
 *
 * type RandomType = AsyncReturnType<typeof generateRandomNumber> // number
 * ```
 */
export type AsyncReturnType<T> = T extends (...args: unknown[]) => Promise<infer U> ? U : T;

type CapitalLetters =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

/**
 * Converts a string type in Snake Case to Camel Case
 * @example
 *
 * ```ts
 * type Foo = "HELLO_EVERYBODY";
 * type Bar = SnakeToCamelCase<Foo>; // "helloEverybody"
 * ```
 */
export type SnakeToCamelCase<Key extends string> = Key extends `${infer First}_${infer Second}`
  ? `${Lowercase<First>}${Capitalize<SnakeToCamelCase<Second>>}`
  : Lowercase<Key>;

/**
 * Converts a string type in Camel Case to Snake Case. You will need to apply Uppercase or Lowercase by yourself though.
 * @example
 *
 * ```ts
 * type Foo = "helloEverybody";
 * type Bar = CamelToSnakeCase<Foo>; // "hello_Everybody"
 *
 * type FooBar = "HELLOEVERYBODY";
 * type SnakeFooBar = CamelToSnakeCase<FooBar>; // "_H_E_L_L_O_E_V_E_R_Y_B_O_D_Y"
 * ```
 */
export type CamelToSnakeCase<Key extends string> = Key extends `${infer Head}${infer Tail}`
  ? Head extends CapitalLetters
    ? `_${Head}${CamelToSnakeCase<Tail>}`
    : `${Head}${CamelToSnakeCase<Tail>}`
  : Key;

/**
 * Enumerates from `0` to `N - 1`
 *
 * type Foo = Enumerate<5>; // Foo = 0 | 1 | 2 | 3 | 4
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/**
 * An exclusive range data type.
 *
 * For inclusive range,
 * @see {@link InclusiveRange}
 * @example
 * ```ts
 * type Foo = Range<2, 5>; // type Foo = 2 | 3 | 4;
 *
 * // you can manually use inclusive range
 * type Bar = Range<2, 5> | 5; // type Bar = 2 | 3 | 4 | 5;
 * ```
 */
export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

/**
 * An inclusive range data type.
 *
 * For exclusive range,
 * @see {@link Range}
 * @example
 * ```ts
 * type Foo = InclusiveRange<2, 5>; // type Foo = 2 | 3 | 4 | 5;
 * ```
 */
export type InclusiveRange<F extends number, T extends number> = Range<F, T> | T;

type Iterator<T, N extends number, Iter extends T[] = []> = Iter['length'] extends N
  ? Iter
  : Iterator<T, N, [...Iter, T]>;

/**
 * An array of type `T` with exactly `N` elements
 *
 * @example
 * ```ts
 * type Foo = "foo";
 * type Bar = StaticArray<Foo, 3>; // type Bar = ["foo", "foo", "foo"];
 * ```
 */
export type StaticArray<T, N extends number> = Readonly<Iterator<T, N>>;

/**
 * Flatten object keys
 * @see https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
 *
 * @example
 * ```ts
 * type Nested = {
 *   a: number;
 *   nested: {
 *     nestedAgain: {
 *       value: string;
 *     };
 *     value: number[];
 *   };
 * }
 *
 * // "a" | "nested.value" | "nested.nestedAgain.value"
 * type NestedKeys = FlattenKeys<Nested>;
 * ```
 */
export type FlattenKeys<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${FlattenKeys<T[K]> extends never
        ? ''
        : T[K] extends unknown[]
          ? ''
          : `.${FlattenKeys<T[K]>}`}`;
    }[keyof T]
  : never;

/**
 * Take the value type given an array type
 *
 * @example
 * ```ts
 * type N = Member<number[]>; // type N = number;
 * ```
 */
export type Member<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? Readonly<U> : never;
