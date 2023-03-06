import React, { useEffect, useState } from "react";
import "./ResultsCard.css";
import PI from "../../assets/placeholder-image.jpg";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const ResultsCard = (props: any) => {
	const [prevCard, setPrevCard] = useState<number>(props.salons.length - 1);
	const [activeCard, setActiveCard] = useState<number>(0);
	const [nextCard, setNextCard] = useState<number>(1);

	useEffect(() => {
		setPrevCard(props.salons.length - 1);
	}, [props.salons]);

	const prevResult = (event: React.MouseEvent<HTMLElement>) => {
		activeCard === 0
			? setActiveCard(props.salons.length - 1)
			: setActiveCard(activeCard - 1);

		prevCard === 0
			? setPrevCard(props.salons.length - 1)
			: setPrevCard(prevCard - 1);

		nextCard === 0
			? setNextCard(props.salons.length - 1)
			: setNextCard(nextCard - 1);

		const activeCardId = props.salons[activeCard].id;

		props.storeCurrentResultPrev(activeCardId);
	};

	const nextResult = (event: React.MouseEvent<HTMLElement>) => {
		activeCard < props.salons.length - 1
			? setActiveCard(activeCard + 1)
			: setActiveCard(0);

		prevCard === props.salons.length - 1
			? setPrevCard(0)
			: setPrevCard(prevCard + 1);

		nextCard === props.salons.length - 1
			? setNextCard(0)
			: setNextCard(nextCard + 1);

		const activeCardId = props.salons[activeCard].id;

		props.storeCurrentResultNext(activeCardId);
	};

	return (
		<div className="w-full h-min-full flex flex-row flex-nowrap align-center justify-center">
			<div className="carousel">
				{/* PREV CARD */}
				{props?.salons.length > 2 && (
					<div
						className="card-container"
						id="prev-card"
						key={props.salons[prevCard].id}
					>
						<div className="card">
							<div className="heading">
								<h3>{props.salons[prevCard].name}</h3>
								<h4>{props.salons[prevCard].location.city}</h4>
							</div>
							<div className="address">
								{`${props.salons[prevCard].location.address}, ${props.salons[prevCard].location.city},`}
								<br />
								{`${props.salons[prevCard].location.region}, ${props.salons[prevCard].location.post_code}`}
							</div>
							<div className="links">
								<InstagramIcon />
								<FacebookIcon />
							</div>
							<div className="mid-section">
								<div className="image">
									<img src={PI} alt="placeholder" />
								</div>
							</div>
							<div className="contact">
								<span className="website">
									www.redcocohairstudio.co.uk
								</span>
								<span className="phone">
									{props.salons[prevCard].phone_number}
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
					key={props.salons[activeCard].id}
				>
					<div className="card">
						<div className="heading">
							<h3>{props.salons[activeCard].name}</h3>
							<h4>{props.salons[activeCard].location.city}</h4>
						</div>
						<div className="address">
							{`${props.salons[activeCard].location.address}, ${props.salons[activeCard].location.city},`}
							<br />
							{`${props.salons[activeCard].location.region}, ${props.salons[activeCard].location.post_code}`}
						</div>

						<div className="links">
							{" "}
							<InstagramIcon className="h-6 w-6 text-main-200 hover:text-main-100 cursor-pointer" />
							<FacebookIcon className="h-6 w-6 text-main-200 hover:text-main-100 cursor-pointer" />
						</div>
						<div className="mid-section">
							<div className="prev" onClick={prevResult}>
								<ArrowSmallLeftIcon className="h-6 w-6 text-black hover:text-main-200 cursor-pointer" />
							</div>
							<div className="image">
								<img src={PI} alt="placeholder" />
							</div>
							<div className="next" onClick={nextResult}>
								<ArrowSmallRightIcon className="h-6 w-6 text-black hover:text-main-200 cursor-pointer" />
							</div>
						</div>
						<div className="contact">
							<span className="website">
								www.redcocohairstudio.co.uk
							</span>
							<span className="phone">0121 747 8332</span>
						</div>
					</div>
					<div className="card-shadow"></div>
				</div>

				{/* NEXT CARD */}
				{props.salons?.length > 1 && (
					<div
						className="card-container"
						id="next-card"
						key={props.salons[nextCard].id}
					>
						<div className="card">
							<div className="heading">
								<h3>{props.salons[nextCard].name}</h3>
								<h4>{props.salons[nextCard].location.city}</h4>
							</div>
							<div className="address">
								{`${props.salons[prevCard].location.address}, ${props.salons[nextCard].location.city},`}
								<br />
								{`${props.salons[prevCard].location.region}, ${props.salons[nextCard].location.post_code}`}
							</div>
							<div className="links">
								{" "}
								<InstagramIcon />
								<FacebookIcon />
							</div>
							<div className="mid-section">
								<div className="image">
									<img src={PI} alt="placeholder" />
								</div>
							</div>
							<div className="contact">
								<span className="website">
									www.redcocohairstudio.co.uk
								</span>
								<span className="phone">
									{props.salons[nextCard].phone_number}
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
