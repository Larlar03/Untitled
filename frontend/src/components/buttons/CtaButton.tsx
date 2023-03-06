import "./CtaButton.css";

const CtaButton = (props: any) => {
	return (
		<button
			id="cta-button"
			type={props.type}
			onClick={props.handleClick}
			disabled={props.isDisabled}
			className="rounded-full"
		>
			{props.text}
		</button>
	);
};

export default CtaButton;
