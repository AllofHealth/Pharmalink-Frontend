/**
 * Use this utility to join classnames together.
 * https://github.com/dcastil/tailwind-merge/blob/v1.14.0/docs/when-and-how-to-use-it.md#adding-props-that-toggle-internal-styles
 * @param args an array of classnames
 * @returns a single classname string
 */

export function join<T>(...args: T[]) {
  return args.filter(Boolean).join(" ")
}
