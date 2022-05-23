import {
	useBreakpoint as useChakraBreakpoint,
	useBreakpointValue as useChakraBreakpointValue,
} from '@chakra-ui/react'

export const useBreakpoint = () => useChakraBreakpoint('sm')
export const useBreakpointValue = <T>(
	values: T[] | Partial<Record<string, T>>
) => useChakraBreakpointValue(values, 'sm')
