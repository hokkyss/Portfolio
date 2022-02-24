import * as React from "react";
import { Route, Switch } from "react-router-dom";

const Home = React.lazy(() =>
	import("./pages/Home").then(value => ({ default: value.default }))
);
const HomeSkeleton = React.lazy(() =>
	import("./pages/HomeSkeleton").then(value => ({ default: value.default }))
);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		fallback: HomeSkeleton,
	},
];

export const Router = () => {
	return (
		<Switch>
			{routes.map(({ path, component: Component, fallback: Fallback }) => (
				<Route
					exact
					key={path}
					path={path}
					render={props => (
						<React.Suspense
							fallback={
								<React.Suspense fallback="">
									<Fallback />
								</React.Suspense>
							}
						>
							<Component {...props} />
						</React.Suspense>
					)}
				/>
			))}
		</Switch>
	);
};
