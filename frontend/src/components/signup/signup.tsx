import "./signup.css";

export default function SignUp() {
	return (
		<div className="search-form-container">
			<form action="submit">
				<button
					// onClick={() => navigate("/confirmation")}
					id="submit-button"
					type="submit"
					className="btn btn-primary"
					// disabled={isDisabled}
				>
					SignUp
				</button>
			</form>
		</div>
	);
}
