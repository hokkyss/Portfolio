/**
 * Wrap try catch
 * @param func
 * @example
 * ```ts
 * const [data, err] = await tryit(async () =>  Promise.resolve(1));
 * if (err) {
 *   console.log('promise rejects', err)
 *   return;
 * }
 * console.log('promise resolves', data)
 * ```
 * @returns The promise result and the error
 */
export function tryit<T, E = Error>(func: () => Promise<T>): Promise<[T, E]>;
/**
 * Wrap try catch
 * @param func
 * @example
 * ```ts
 * const [data, err] = tryit(() => JSON.parse('--------{"a":1234, "b":"bbb"}'))
 * if (err) {
 *   console.log('invalid json', err)
 *   return;
 * }
 * console.log('handle data...', data)
 * ```
 * @returns The promise result and the error
 */
export function tryit<T, E = Error>(func: () => T): [T, E];
/**
 * Wrap try catch
 * @param promise
 * @example
 * ```ts
 * const [data, err] = await tryit(Promise.resolve(1));
 * // const [data, err] = await tryit(Promise.reject(new Error("dummy promise rejection")));
 * if (err) {
 *   console.log('promise rejects', err)
 *   return;
 * }
 * console.log('promise resolves', data)
 * ```
 * @returns The promise result and the error
 */
export function tryit<T, E = Error>(promise: Promise<T>): Promise<[T, E]>;
export function tryit<T, E = Error>(
  promiseOrFunction: (() => Promise<T>) | (() => T) | Promise<T>,
) {
  if (promiseOrFunction instanceof Promise) {
    return promiseOrFunction
      .then<[T, null]>((data) => [data, null])
      .catch<[undefined, E]>((err) => [undefined, err]);
  }

  // `promiseOrFunction` is a function
  try {
    const result = promiseOrFunction();

    if (result instanceof Promise) {
      return tryit<T, E>(result);
    }
    return [result, null];
  } catch (err) {
    return [undefined, err];
  }
}
