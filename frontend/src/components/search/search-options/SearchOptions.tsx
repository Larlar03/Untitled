import { useEffect, useState } from "react";
import "./SearchOptions.css";
import services from "../../../constants/services";

export default function SearchOptions(props: any) {
	const [options, setOptions] = useState<Array<string>>([]);

	useEffect(() => {
		props.selectServices(options);
	}, [options]);

	const handleServiceClick = (event: React.MouseEvent<HTMLElement>): void => {
		const selection: any = event.currentTarget.textContent;

		setOptions((prev: string[]) => {
			if (prev.includes(selection)) {
				return prev.filter((option) => option !== selection);
			} else {
				return [...prev, selection];
			}
		});

		applyStyles(event);
	};

	const applyStyles = (event: React.MouseEvent<HTMLElement>): void => {
		const currentSelection = event.currentTarget;
		currentSelection.classList[2]
			? currentSelection.classList.remove("active")
			: currentSelection.classList.add("active");
	};

	return (
		<ul className="services-container">
			{services.map((service, i) => (
				<li
					onClick={handleServiceClick}
					key={i}
					id={service}
					className="service-button grow"
				>
					{service}
				</li>
			))}
		</ul>
	);
}
