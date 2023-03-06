import { useEffect, useState } from "react";
import services from "../../../constants/services";
import OptionButton from "../../buttons/OptionButton";

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
		currentSelection.classList[3]
			? currentSelection.classList.remove("active")
			: currentSelection.classList.add("active");
	};

	return (
		<ul className="list-none my-9 mx-auto p-0 flex flex-row flex-wrap justify-center gap-2.5 text-center md:gap-1.5 md:my-5">
			{services.map((service, i) => (
				<OptionButton
					key={i}
					id={props.serviceName}
					serviceName={service}
					handleClick={handleServiceClick}
				/>
			))}
		</ul>
	);
}
