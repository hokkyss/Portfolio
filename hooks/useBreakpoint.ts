import {
	useBreakpoint as useChakraBreakpoint,
	useBreakpointValue as useChakraBreakpointValue,
} from '@chakra-ui/react'

type Breakpoints = 'base' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * @description `base` 0em
 * @description `xs` 20em
 * @description `sm` 30em
 * @description `md` 48em
 * @description `lg` 62em
 * @description `xl` 80em
 * @description `2xl` 96em
 */
export const useBreakpoint = () => useChakraBreakpoint('sm') as Breakpoints

export const useBreakpointValue = <T>(
	values: T[] | Partial<Record<Breakpoints, T>>
) => useChakraBreakpointValue(values, 'sm') as T
