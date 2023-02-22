import { ReactNode } from "react";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return <div className="xl mx-auto max-w-4xl  p-4">{children}</div>;
};
export default Layout;
