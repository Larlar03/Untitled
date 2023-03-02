import "./SignUpPage.css";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";
import SignUp from "../components/signup/signup";

export default function SignUpPage(props: any) {
	return (
		<>
			<Navbar />
			<div className="container-fluid" id="MainPage">
				<div id="MainPageContent">
					<Header subheading="Sign Up" />
					<SignUp />
				</div>
				<div id="MainPageContentShadow"></div>
			</div>
		</>
	);
}
