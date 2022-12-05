import { act } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./ResultsCard.css";
import PI from "../../assets/placeholder-image.jpg";

interface Props {
    salons: { id: number; name: string; post_code: string }[];
    storeCurrentResultPrev(id: number): void;
    storeCurrentResultNext(id: number): void;
}

function ResultsCard(props: any) {
    const [prevCard, setPrevCard] = useState<number>(props.salons.length - 1);
    const [activeCard, setActiveCard] = useState<number>(0);
    const [nextCard, setNextCard] = useState<number>(1);

    useEffect(() => {
        setPrevCard(props.salons.length - 1);
    }, [props.salons]);

    const prevResult = (event: React.MouseEvent<HTMLElement>) => {
        // Prev button logic here
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

    //  Fix order that cards display on next click
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

        // console.log(salons[activeCard].id);
        const activeCardId = props.salons[activeCard].id;

        props.storeCurrentResultNext(activeCardId);
    };

    return (
        <div id="ResultsCard">
            {/* <div className="prev" onClick={prevResult}>
        <i className="bi bi-arrow-left-circle-fill"></i>
      </div> */}
            {!props.salons ? (
                <p>Loading</p>
            ) : (
                <div className="carousel">
                    {/* PREV CARD */}
                    <div
                        className="card-container"
                        id="prev-card"
                        key={props.salons[prevCard].id}
                    >
                        <div className="results-card">
                            <div className="heading">
                                <h3>{props.salons[prevCard].name}</h3>
                                <h4>Walsall</h4>
                            </div>
                            <div className="address">
                                99 Darlington Street, Wolverhampton, West
                                Midlands, WV1 4EX
                            </div>
                            <div className="links">
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-facebook"></i>
                            </div>
                            <div className="image">
                                <img src={PI} alt="placeholder" />
                            </div>
                            <div className="contact">
                                <span className="website">
                                    www.redcocohairstudio.co.uk
                                </span>
                                <span className="phone">01217478332</span>
                            </div>
                        </div>
                        <div className="results-card-shadow"></div>
                    </div>

                    {/* ACTIVE CARD */}

                    <div
                        className="card-container"
                        id="active-card"
                        key={props.salons[activeCard].id}
                    >
                        <div className="results-card">
                            <div className="heading">
                                <h3>{props.salons[activeCard].name}</h3>
                                <h4>Walsall</h4>
                            </div>
                            <div className="address">
                                99 Darlington Street, Wolverhampton, West
                                Midlands, WV1 4EX
                            </div>

                            <div className="links">
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-facebook"></i>
                            </div>
                            <div className="mid-section">
                                <div className="prev" onClick={prevResult}>
                                    <i className="bi bi-arrow-left-short"></i>{" "}
                                </div>
                                <div className="image">
                                    <img src={PI} alt="placeholder" />
                                </div>
                                <div className="next" onClick={nextResult}>
                                    <i className="bi bi-arrow-right-short"></i>{" "}
                                </div>
                            </div>
                            <div className="contact">
                                <span className="website">
                                    www.redcocohairstudio.co.uk
                                </span>
                                <span className="phone">0121 747 8332</span>
                            </div>
                        </div>
                        <div className="results-card-shadow"></div>
                    </div>

                    {/* NEXT CARD */}
                    <div
                        className="card-container"
                        id="next-card"
                        key={props.salons[nextCard].id}
                    >
                        <div className="results-card">
                            <div className="heading">
                                <h3>{props.salons[nextCard].name}</h3>
                                <h4>Walsall</h4>
                            </div>
                            <div className="address">
                                99 Darlington Street, Wolverhampton, West
                                Midlands, WV1 4EX
                            </div>
                            <div className="links">
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-facebook"></i>
                            </div>
                            <div className="image">
                                <img src={PI} alt="placeholder" />
                            </div>
                            <div className="contact">
                                <span className="website">
                                    www.redcocohairstudio.co.uk
                                </span>
                                <span className="phone">01217478332</span>
                            </div>
                        </div>
                        <div className="results-card-shadow"></div>
                    </div>
                </div>
            )}

            {/* <div className="next" onClick={nextResult}>
        <i className="bi bi-arrow-right-circle-fill"></i>
      </div> */}
        </div>
    );
}

export default ResultsCard;
