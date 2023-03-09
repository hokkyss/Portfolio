import * as React from 'react'
import {
	Box,
	FormControl as ChakraFormControl,
	forwardRef,
	FormControlProps,
} from '@chakra-ui/react'

export const FormControl = forwardRef<Omit<FormControlProps, 'variant'>, 'div'>(
	(props, ref) => {
		return (
			<Box ref={ref}>
				<ChakraFormControl {...props} variant="floating" />
			</Box>
		)
	}
)
