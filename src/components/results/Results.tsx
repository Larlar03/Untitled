import { useState, useEffect } from 'react';
import ResultsCard from './results-card/ResultsCard';
import ResultsNav from './results-nav/ResultsNav';
import Studio from '../../types/studios';

interface Props {
    results?: Studio[];
}

const Results = (props: Props) => {
    const [resultsTotal, setResultsTotal] = useState<number>(0);
    const [prevCard, setPrevCard] = useState<number>(0);
    const [activeCard, setActiveCard] = useState<number>(0);
    const [nextCard, setNextCard] = useState<number>(1);

    useEffect(() => {
        if (props.results) {
            setResultsTotal(props.results.length);
            setPrevCard(props.results.length - 1);
        }
    }, [props.results]);

    const handleNextClick = () => {
        if (props.results) {
            setPrevCard(
                prevCard === props.results.length - 1 ? 0 : prevCard + 1
            );
            setActiveCard(
                activeCard < props.results.length - 1 ? activeCard + 1 : 0
            );
            setNextCard(
                nextCard === props.results.length - 1 ? 0 : nextCard + 1
            );
        }
    };

    const handlePrevClick = () => {
        if (props.results) {
            setPrevCard(
                prevCard === 0 ? props.results.length - 1 : prevCard - 1
            );
            setActiveCard(
                activeCard === 0 ? props.results.length - 1 : activeCard - 1
            );
            setNextCard(
                nextCard === 0 ? props.results.length - 1 : nextCard - 1
            );
        }
    };

    return (
        <>
            <ResultsNav
                resultsTotal={resultsTotal}
                activeCardNum={activeCard}
                handleNextClick={handleNextClick}
                handlePrevClick={handlePrevClick}
            />
            <div className='h-full w-full flex flex-row flex-nowrap justify-center'>
                {props.results && props.results.length > 0 ? (
                    <div className='w-full h-full flex flex-row flex-nowrap justify-center align-middle gap-8'>
                        {props.results?.length <= 2 && (
                            <ResultsCard
                                studio={props.results[activeCard]}
                                isActive={true}
                            />
                        )}
                        {props.results?.length >= 3 && (
                            <>
                                <ResultsCard
                                    studio={props.results[prevCard]}
                                    isActive={false}
                                />
                                <ResultsCard
                                    studio={props.results[activeCard]}
                                    isActive={true}
                                />
                                <ResultsCard
                                    studio={props.results[nextCard]}
                                    isActive={false}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    <p>No Results</p>
                )}
            </div>
        </>
    );
};

export default Results;