import "./Header.css";
import { Link } from "react-router-dom";

export default function Header(props: any) {
	return (
		<div className="text-center">
			<h1 className="text-6xl font-bold font-spacegrotesk no-underline hover:text-red-600">
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
}
