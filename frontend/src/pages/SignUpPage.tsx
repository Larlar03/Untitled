import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import SignUp from "../components/signup/signup";

export default function SignUpPage(props: any) {
	return (
		<>
			<Navbar />
			<div id="Page" className="h-screen max-w-md p-0 mx-auto">
				<div id="PageCard" className="px-11">
					<Header subheading="Sign Up" />
					<SignUp />
				</div>
				<div id="PageCardShadow"></div>
			</div>
		</>
	);
}
