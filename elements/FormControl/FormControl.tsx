import * as React from 'react'
import {
	Box,
	FormControl as ChakraFormControl,
	forwardRef,
	FormControlProps,
	useColorModeValue,
} from '@chakra-ui/react'

export const FormControl = forwardRef<Omit<FormControlProps, 'variant'>, 'div'>(
	(props, ref) => {
		const variant = useColorModeValue('floating', 'dark-floating')
		return (
			<Box ref={ref} p={2}>
				<ChakraFormControl {...props} variant={variant} />
			</Box>
		)
	}
)
