import {
	useBreakpoint as useChakraBreakpoint,
	useBreakpointValue as useChakraBreakpointValue,
} from '@chakra-ui/react'

export const useBreakpoint = () => useChakraBreakpoint('sm')
export const useBreakpointValue = (
	values: any[] | Partial<Record<string, any>>
) => useChakraBreakpointValue(values, 'sm')
