import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Navbar() {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handleNavClick = () => {
		!showMenu ? setShowMenu(true) : setShowMenu(false);
	};

	useEffect(() => {
		const links = document.getElementById("links");
		console.log(links);
		if (links && showMenu) {
			links.classList.remove("hidden");
			links.classList.add("visible", "transition");
		}
		if (links && !showMenu) {
			links.classList.remove("visible", "transition");
			links.classList.add("hidden");
		}
	}, [showMenu]);

	return (
		<div className="navbar-container">
			<div className="navbar">
				<div className="nav-link-container">
					<div id="links">
						<Link key={1} className="nav-link" to="/">
							Home
						</Link>
						<Link key={2} className="nav-link" to="/">
							Sign In
						</Link>
					</div>
				</div>
				<div className="nav-icon">
					<button
						type="button"
						className="btn btn-link"
						id="nav-btn"
						onClick={handleNavClick}
					>
						<i className="bi bi-three-dots"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
