import { act } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import "./ResultsCard.css";

interface Props {
  salons: { id: number; name: string; post_code: string }[];
  storeCurrentResultPrev(id: number): void;
  storeCurrentResultNext(id: number): void;
}

function ResultsCard({
  salons,
  storeCurrentResultPrev,
  storeCurrentResultNext,
}: Props) {
  const [prevCard, setPrevCard] = useState<number>(salons.length - 1);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [nextCard, setNextCard] = useState<number>(1);

  useEffect(() => {
    setPrevCard(salons.length - 1);
  }, [salons]);

  const prevResult = (event: React.MouseEvent<HTMLElement>) => {
    // Prev button logic here
    activeCard === 0
      ? setActiveCard(salons.length - 1)
      : setActiveCard(activeCard - 1);

    prevCard === 0 ? setPrevCard(salons.length - 1) : setPrevCard(prevCard - 1);

    nextCard === 0 ? setNextCard(salons.length - 1) : setNextCard(nextCard - 1);

    const activeCardId = salons[activeCard].id;

    storeCurrentResultPrev(activeCardId);
  };

  //  Fix order that cards display on next click
  const nextResult = (event: React.MouseEvent<HTMLElement>) => {
    activeCard < salons.length - 1
      ? setActiveCard(activeCard + 1)
      : setActiveCard(0);

    prevCard === salons.length - 1 ? setPrevCard(0) : setPrevCard(prevCard + 1);

    nextCard === salons.length - 1 ? setNextCard(0) : setNextCard(nextCard + 1);

    // console.log(salons[activeCard].id);
    const activeCardId = salons[activeCard].id;

    storeCurrentResultNext(activeCardId);
  };

  return (
    <div id="ResultsCard">
      <div className="prev" onClick={prevResult}>
        <i className="bi bi-arrow-left-circle-fill"></i>
      </div>
      {!salons ? (
        <p>Loading</p>
      ) : (
        <div className="carousel">
          <div
            className="results-card"
            id="results-card-prev"
            key={salons[prevCard].id}
          >
            <div className="results-card-heading">
              <h3>{salons[prevCard].name}</h3>
              <h4>{salons[prevCard].post_code}</h4>
              <div className="star-rating">*****</div>
            </div>
            <div className="results-description">
              <p>
                Services offered by Francesco Group include silk press, trims,
                extensions, texture release, colour, braids and more...
              </p>
            </div>
            <div className="results-card-links">
              <i className="bi bi-box-arrow-up-right"></i>
              <i className="bi bi-telephone"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-facebook"></i>
            </div>
            <div className="results-card-address">
              99 Darlington Street, Wolverhampton, West Midlands, WV1 4EX
            </div>
            <div className="results-map-container">
              {/* <iframe
                title="Salon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.1063768129247!2d-2.131966048611175!3d52.58576993900637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b9a913c037b%3A0x73dec7565c6ed3c0!2sFrancesco%20Group!5e0!3m2!1sen!2suk!4v1660207736054!5m2!1sen!2suk"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe> */}
            </div>
          </div>

          <div
            className="results-card"
            id="results-card-active"
            key={salons[activeCard].id}
          >
            <div className="results-card-heading">
              <h3>{salons[activeCard].name}</h3>
              <h4>{salons[activeCard].post_code}</h4>
              <div className="star-rating">*****</div>
            </div>
            <div className="results-description">
              <p>
                Services offered by Francesco Group include silk press, trims,
                extensions, texture release, colour, braids and more...
              </p>
            </div>
            <div className="results-card-links">
              <i className="bi bi-box-arrow-up-right"></i>
              <i className="bi bi-telephone"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-facebook"></i>
            </div>
            <div className="results-card-address">
              99 Darlington Street, Wolverhampton, West Midlands, WV1 4EX
            </div>
            <div className="results-map-container">
              {/* <iframe
                title="Salon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.1063768129247!2d-2.131966048611175!3d52.58576993900637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b9a913c037b%3A0x73dec7565c6ed3c0!2sFrancesco%20Group!5e0!3m2!1sen!2suk!4v1660207736054!5m2!1sen!2suk"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe> */}
            </div>
          </div>

          <div
            className="results-card"
            id="results-card-next"
            key={salons[nextCard].id}
          >
            <div className="results-card-heading">
              <h3>{salons[nextCard].name}</h3>
              <h4>{salons[nextCard].post_code}</h4>
              <div className="star-rating">*****</div>
            </div>
            <div className="results-description">
              <p>
                Services offered by Francesco Group include silk press, trims,
                extensions, texture release, colour, braids and more...
              </p>
            </div>
            <div className="results-card-links">
              <i className="bi bi-box-arrow-up-right"></i>
              <i className="bi bi-telephone"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-facebook"></i>
            </div>
            <div className="results-card-address">
              99 Darlington Street, Wolverhampton, West Midlands, WV1 4EX
            </div>
            <div className="results-map-container">
              {/* <iframe
                title="Salon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.1063768129247!2d-2.131966048611175!3d52.58576993900637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b9a913c037b%3A0x73dec7565c6ed3c0!2sFrancesco%20Group!5e0!3m2!1sen!2suk!4v1660207736054!5m2!1sen!2suk"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe> */}
            </div>
          </div>
        </div>
      )}

      <div className="next" onClick={nextResult}>
        <i className="bi bi-arrow-right-circle-fill"></i>
      </div>
    </div>
  );
}

export default ResultsCard;
