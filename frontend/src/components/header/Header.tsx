import { Link } from "react-router-dom";

export interface Props {
	subheading: string;
}

const Header = (props: Props) => {
	return (
		<div className="text-center">
			<h1 className="text-6xl font-bold font-spacegrotesk no-underline hover:text-black">
				<Link
					to="/
      "
				>
					untitled
				</Link>
			</h1>
			<h2 className="text-xl font-normal font-spacemono">
				{props.subheading}
			</h2>
		</div>
	);
};

export default Header;
