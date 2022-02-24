import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

const HomeSkeleton: React.FC = () => {
	return (
		<React.Fragment>
			<Skeleton />
		</React.Fragment>
	);
};

export default React.memo(HomeSkeleton);
