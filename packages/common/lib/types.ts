/**
 * A value `v` is a primitive if and only if `JSON.parse(JSON.stringify(v))` equals `v`.
 *
 * Example:
 * ```typescript
 * const value: Primitive = 1; // OK
 * const invalid: Primitive = new Date(); // Error: Date is not assignable to Primitive
 * const stillValid: Primitive = [1, 2, 3]; // OK
 * ```
 */
export type Primitive = boolean | null | number | Primitive[] | PrimitiveObject | string | undefined;

/**
 * Example:
 * ```ts
 * const value: Primitive = {a: 1}; // OK
 * const invalid: Primitive = new Map(); // Error: Map is not assignable to Primitive
 * ```
 */
export type PrimitiveObject = {
  [key: number | string]: Primitive;
};
