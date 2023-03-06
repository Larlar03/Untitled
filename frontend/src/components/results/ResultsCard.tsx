import React, { useEffect, useState } from "react";
import "./ResultsCard.css";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const ResultsCard = (props: any) => {
	const [prevCard, setPrevCard] = useState<number>(props.studios.length - 1);
	const [activeCard, setActiveCard] = useState<number>(0);
	const [nextCard, setNextCard] = useState<number>(1);

	useEffect(() => {
		setPrevCard(props.studios.length - 1);
	}, [props.studios]);

	const prevResult = () => {
		activeCard === 0
			? setActiveCard(props.studios.length - 1)
			: setActiveCard(activeCard - 1);

		prevCard === 0
			? setPrevCard(props.studios.length - 1)
			: setPrevCard(prevCard - 1);

		nextCard === 0
			? setNextCard(props.studios.length - 1)
			: setNextCard(nextCard - 1);

		const activeCardId = props.studios[activeCard].id;

		props.storeCurrentResultPrev(activeCardId);
		console.log(prevCard);
		console.log(activeCard);
		console.log(nextCard);
	};

	const nextResult = () => {
		activeCard < props.studios.length - 1
			? setActiveCard(activeCard + 1)
			: setActiveCard(0);

		prevCard === props.studios.length - 1
			? setPrevCard(0)
			: setPrevCard(prevCard + 1);

		nextCard === props.studios.length - 1
			? setNextCard(0)
			: setNextCard(nextCard + 1);

		const activeCardId = props.studios[activeCard].id;

		props.storeCurrentResultNext(activeCardId);
	};

	return (
		<div className="w-full h-min-full flex flex-row flex-nowrap align-center justify-center">
			<div className="carousel">
				{/* PREV CARD */}
				{props?.studios.length > 2 && (
					<div
						className="card-container"
						id="prev-card"
						key={props.studios[prevCard].id}
					>
						<div className="card">
							<div className="heading">
								<h3>{props.studios[prevCard].name}</h3>
								<h4>{props.studios[prevCard].location.city}</h4>
							</div>
							<div className="address">
								{`${props.studios[prevCard].location.address}, ${props.studios[prevCard].location.city},`}
								<br />
								{`${props.studios[prevCard].location.region}, ${props.studios[prevCard].location.post_code}`}
							</div>
							<div className="mid-section">
								<div className="image">
									<img
										src={props.studios[prevCard].logo}
										alt="placeholder"
									/>
								</div>
							</div>
							<div className="links">
								<InstagramIcon />
								<FacebookIcon />
							</div>
							<div className="contact">
								<span>
									{`${props.studios[prevCard].social_links.website}`}
								</span>
								<span>
									{props.studios[prevCard].phone_number}
								</span>
							</div>
						</div>
						<div className="card-shadow"></div>
					</div>
				)}

				{/* ACTIVE CARD */}
				<div
					className="card-container"
					id="active-card"
					key={props.studios[activeCard].id}
				>
					<div className="card">
						<div className="heading">
							<a
								href={
									props.studios[activeCard].social_links
										.website
								}
							>
								<h3>{props.studios[activeCard].name}</h3>
							</a>
							<h4>{props.studios[activeCard].location.city}</h4>
						</div>
						<div className="address">
							{`${props.studios[activeCard].location.address}, ${props.studios[activeCard].location.city},`}
							<br />
							{`${props.studios[activeCard].location.region}, ${props.studios[activeCard].location.post_code}`}
						</div>

						<div className="mid-section">
							<div className="prev" onClick={prevResult}>
								<ArrowSmallLeftIcon className="h-6 w-6 text-black hover:text-main-200 cursor-pointer" />
							</div>
							<div className="image">
								<img
									src={props.studios[activeCard].logo}
									alt="placeholder"
								/>
							</div>
							<div className="next" onClick={nextResult}>
								<ArrowSmallRightIcon className="h-6 w-6 text-black hover:text-main-200 cursor-pointer" />
							</div>
						</div>
						<div className="links">
							<a
								href={
									props.studios[activeCard].social_links
										.instagram
								}
								rel="noreferrer"
								target="_blank"
							>
								<InstagramIcon className="h-6 w-6 text-main-200 hover:text-main-100 cursor-pointer" />
							</a>
							<a
								target="_blank"
								rel="noreferrer"
								href={
									props.studios[activeCard].social_links
										.facebook
								}
							>
								<FacebookIcon className="h-6 w-6 text-main-200 hover:text-main-100 cursor-pointer" />
							</a>
						</div>
						<div className="contact">
							<span>
								<a
									target="_blank"
									rel="noreferrer"
									href={
										props.studios[activeCard].social_links
											.website
									}
								>
									{`${props.studios[activeCard].social_links.website}`}
								</a>
							</span>
							<span>
								<a
									href={`tel:${props.studios[activeCard].phone_number}`}
								>
									{props.studios[activeCard].phone_number}
								</a>
							</span>
						</div>
					</div>
					<div className="card-shadow"></div>
				</div>

				{/* NEXT CARD */}
				{props.studios?.length > 1 && (
					<div
						className="card-container"
						id="next-card"
						key={props.studios[nextCard].id}
					>
						<div className="card">
							<div className="heading">
								<h3>{props.studios[nextCard].name}</h3>
								<h4>{props.studios[nextCard].location.city}</h4>
							</div>
							<div className="address">
								{`${props.studios[nextCard].location.address}, ${props.studios[nextCard].location.city},`}
								<br />
								{`${props.studios[nextCard].location.region}, ${props.studios[nextCard].location.post_code}`}
							</div>
							<div className="mid-section">
								<div className="image">
									<img
										src={props.studios[nextCard].logo}
										alt="placeholder"
									/>
								</div>
							</div>
							<div className="links">
								<InstagramIcon />
								<FacebookIcon />
							</div>
							<div className="contact">
								<span>
									{`${props.studios[nextCard].social_links.website}`}
								</span>
								<span>
									{props.studios[nextCard].phone_number}
								</span>
							</div>
						</div>
						<div className="card-shadow"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ResultsCard;
