import * as React from "react";

import { Icon } from "@iconify/react";
import chevronUp from "@iconify/icons-akar-icons/chevron-up";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface Props {
	window?: () => Window;
}

const ScrollToTop = React.memo(function ScrollToTop({ window }: Props) {
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = React.useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const anchor = (
				(e.target as HTMLDivElement).ownerDocument || document
			).querySelector("#top");

			if (anchor) {
				anchor.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		},
		[]
	);

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: "fixed", bottom: 24, right: 24 }}
			>
				<Fab color="primary" size="medium" aria-label="scroll to top">
					<Icon icon={chevronUp} />
				</Fab>
			</Box>
		</Zoom>
	);
});

const Footer: React.FC = () => {
	return (
		<AppBar
			position="relative"
			color="transparent"
			sx={{ bottom: 0, top: "auto" }}
			component="footer"
		>
			HALO
			<ScrollToTop window={() => window} />
		</AppBar>
	);
};

export default React.memo(Footer);
