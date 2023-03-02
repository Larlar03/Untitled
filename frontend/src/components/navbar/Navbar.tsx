import "./Navbar.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { Link } from "react-router-dom";

export default function Navbar() {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handleNavClick = () => {
		!showMenu ? setShowMenu(true) : setShowMenu(false);
	};

	return (
		<div className="navbar-container">
			<div className="navbar">
				<div className="nav-link-container">
					<Box sx={{ height: 28.5 }}>
						<Box sx={{ display: "flex", gap: "25px" }}>
							<Grow in={showMenu}>
								<Link key={1} className="nav-link" to="/">
									Home
								</Link>
							</Grow>
							<Grow
								in={showMenu}
								style={{ transformOrigin: "0 0 0" }}
								{...(showMenu ? { timeout: 1000 } : {})}
							>
								<Link key={2} className="nav-link" to="/signup">
									Sign Up
								</Link>
							</Grow>
							<Grow
								in={showMenu}
								style={{ transformOrigin: "0 0 0" }}
								{...(showMenu ? { timeout: 2000 } : {})}
							>
								<Link key={2} className="nav-link" to="/login">
									Log In
								</Link>
							</Grow>
						</Box>
					</Box>
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
