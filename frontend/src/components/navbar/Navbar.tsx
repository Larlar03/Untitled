import { useState } from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import { Link } from "react-router-dom";
import { Bars2Icon } from "@heroicons/react/24/solid";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handleNavClick = () => {
		!showMenu ? setShowMenu(true) : setShowMenu(false);
	};

	return (
		<div className="max-w-lg mx-auto pt-5 mb-2.5 flex flex-nowrap items-center justify-center">
			<div className="w-11/12 font-spacemono font-bold text-greyscale-100">
				<Box sx={{ height: 28.5 }}>
					<Box sx={{ display: "flex", gap: "25px" }}>
						<Grow in={showMenu}>
							<Link key={1} to="/">
								Home
							</Link>
						</Grow>
						<Grow
							in={showMenu}
							style={{ transformOrigin: "0 0 0" }}
							{...(showMenu ? { timeout: 1000 } : {})}
						>
							<Link key={2} to="/signup">
								Sign Up
							</Link>
						</Grow>
						<Grow
							in={showMenu}
							style={{ transformOrigin: "0 0 0" }}
							{...(showMenu ? { timeout: 2000 } : {})}
						>
							<Link key={2} to="/login">
								Log In
							</Link>
						</Grow>
					</Box>
				</Box>
			</div>
			<button
				type="button"
				className="text-right"
				id=""
				onClick={handleNavClick}
			>
				<Bars2Icon className="h-6 w-6 text-greyscale-100 hover:text-main-200" />
			</button>
		</div>
	);
};

export default Navbar;
