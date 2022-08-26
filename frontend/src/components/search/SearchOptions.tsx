import { useEffect, useState } from "react";
import "./SearchOptions.css";

const services = [
  "Any",
  "Conditioning Treatments",
  "Silk Press",
  "Trims",
  "Braids",
  "Relaxer",
  "Extentions",
  "Keratin",
  "Wash, Cut & Style",
  "Texture Release",
  "Colour",
  "Texturizer",
  "Children",
  "Twist Out",
  "Curl Set",
  "Other",
];

interface Props {
  storeOptions(arr: string[]): void;
}

export default function SearchOptions({ storeOptions }: Props) {
  const [optionsArr, setOptionsArr] = useState<Array<string>>([]);

  useEffect(() => {
    storeOptions(optionsArr);
  }, [optionsArr]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const clickedOption: any = event.currentTarget.textContent;

    setOptionsArr((prev: string[]) => {
      if (prev.includes(clickedOption)) {
        return prev.filter((option) => option !== clickedOption);
      } else {
        return [...prev, clickedOption];
      }
    });

    // console.log(optionsArr);

    applyStyles(event);
  };

  const applyStyles = (event: React.MouseEvent<HTMLElement>): void => {
    const currentOption = event.currentTarget;
    currentOption.classList[2]
      ? currentOption.classList.remove("active")
      : currentOption.classList.add("active");
  };

  return (
    <ul className="services-container">
      {services.map((service, i) => (
        <li
          onClick={handleClick}
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
