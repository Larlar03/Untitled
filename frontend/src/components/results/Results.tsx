import React, { useState, useEffect } from "react";
import ResultsCard from "./ResultsCard";
import Axios from "axios";
import ResultsNav from "./ResultsNav";
import Salons from "../../types/salons";

function Results(props: any) {
    const [currentResult, setCurrentResult] = useState<number>(1);
    const [salons, setSalons] = useState<Salons[]>();
    const [data, setData] = useState<
        { id: number; name: string; post_code: string }[]
    >([
        { id: 0, name: "", post_code: "" },
        { id: 1, name: "", post_code: "" },
        { id: 2, name: "", post_code: "" },
    ]);

    useEffect(() => {
        console.log(props.results);
        setSalons(props.results);
    }, []);

    const storeCurrentResultPrev = (id: number) => {
        id === 1 ? setCurrentResult(data.length) : setCurrentResult(id - 1);
    };

    const storeCurrentResultNext = (id: number) => {
        id > data.length - 1 ? setCurrentResult(1) : setCurrentResult(id + 1);
    };

    useEffect(() => {
        Axios.get(`http://localhost:3001/salons`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    return (
        <div className="results-container">
            <ResultsNav salons={data} currentResult={currentResult} />
            {/* Map Results cards in a carousel */}
            <ResultsCard
                salons={data}
                storeCurrentResultPrev={storeCurrentResultPrev}
                storeCurrentResultNext={storeCurrentResultNext}
            />
        </div>
    );
}

export default Results;
