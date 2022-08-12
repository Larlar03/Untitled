import React, { useState } from "react";
import "./ResultsCard.css";

function ResultsCard(props: any) {
  const [resultNum, setResultNum] = useState<number>(0);

  const prevResult = (event: React.MouseEvent<HTMLElement>) => {
    resultNum > 0
      ? setResultNum(resultNum - 1)
      : setResultNum(props.salons.length - 1);
    props.storeCurrentResult(resultNum);
  };

  const nextResult = (event: React.MouseEvent<HTMLElement>) => {
    resultNum < props.salons.length - 1
      ? setResultNum(resultNum + 1)
      : setResultNum(0);
    props.storeCurrentResult(resultNum);
  };

  return (
    <div className="results-card-container">
      <div className="prev" onClick={prevResult}>
        <i className="bi bi-arrow-left-circle-fill"></i>
      </div>
      <div className="results-card">
        <div className="results-card-heading">
          <h3>{props.salons[resultNum].name}</h3>
          <h4>{props.salons[resultNum].city}</h4>
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
          <iframe
            title="Salon Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.1063768129247!2d-2.131966048611175!3d52.58576993900637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b9a913c037b%3A0x73dec7565c6ed3c0!2sFrancesco%20Group!5e0!3m2!1sen!2suk!4v1660207736054!5m2!1sen!2suk"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="next" onClick={nextResult}>
        <i className="bi bi-arrow-right-circle-fill"></i>
      </div>
    </div>
  );
}

export default ResultsCard;

// {salons.map((salon) => {
//   return (
//     <div className="results-card">
//       <div className="results-card-heading">
//         <h3>{salon.name}</h3>
//         <h4>{salon.city}</h4>
//         <div className="star-rating">*****</div>
//       </div>
//       <div className="results-description">
//         <p>
//           Services offered by Francesco Group include silk press, trims,
//           extensions, texture release, colour, braids and more...
//         </p>
//       </div>
//       <div className="results-card-links">
//         <i className="bi bi-box-arrow-up-right"></i>
//         <i className="bi bi-telephone"></i>
//         <i className="bi bi-instagram"></i>
//         <i className="bi bi-facebook"></i>
//       </div>
//       <div className="results-card-address">
//         99 Darlington Street, Wolverhampton, West Midlands, WV1 4EX
//       </div>
//       <div className="results-map-container">
//         <iframe
//           title="Salon Location"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.1063768129247!2d-2.131966048611175!3d52.58576993900637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48709b9a913c037b%3A0x73dec7565c6ed3c0!2sFrancesco%20Group!5e0!3m2!1sen!2suk!4v1660207736054!5m2!1sen!2suk"
//           style={{ border: 0 }}
//           loading="lazy"
//         ></iframe>
//       </div>
//     </div>
//   );
// })}
