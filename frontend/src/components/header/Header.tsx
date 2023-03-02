import "./Header.css";
import { Link } from "react-router-dom";

export default function Header(props: any) {
	return (
		<div className="header-container">
			<h1>
				<Link
					to="/
      "
				>
					untitled
				</Link>
			</h1>
			<h2>{props.subheading}</h2>
		</div>
	);
}
