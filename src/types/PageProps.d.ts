declare type PageProps = import("react-router-dom").RouteComponentProps<
	{
		[x: string]: string | undefined;
	},
	import("react-router").StaticContext,
	unknown
>;
