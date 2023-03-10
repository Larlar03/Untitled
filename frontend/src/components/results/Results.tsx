import { useState, useEffect } from 'react';
import ResultsCard from './results-card/ResultsCard';
import ResultsNav from './results-nav/ResultsNav';
import Studio from '../../types/studios';

const Results = ({ results }: { results: Array<Studio> }) => {
    const [resultsTotal, setResultsTotal] = useState<number>(results.length);
    const [prevCard, setPrevCard] = useState<number>(results.length - 1);
    const [activeCard, setActiveCard] = useState<number>(0);
    const [nextCard, setNextCard] = useState<number>(1);

    useEffect(() => {
        setResultsTotal(results.length);
        setPrevCard(results.length - 1);
    }, [results]);

    const handleNextClick = () => {
        setPrevCard(prevCard === results.length - 1 ? 0 : prevCard + 1);
        setActiveCard(activeCard < results.length - 1 ? activeCard + 1 : 0);
        setNextCard(nextCard === results.length - 1 ? 0 : nextCard + 1);
    };

    const handlePrevClick = () => {
        setPrevCard(prevCard === 0 ? results.length - 1 : prevCard - 1);
        setActiveCard(activeCard === 0 ? results.length - 1 : activeCard - 1);
        setNextCard(nextCard === 0 ? results.length - 1 : nextCard - 1);
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
                <div className='w-full h-full flex flex-row flex-nowrap justify-center align-middle gap-8'>
                    <ResultsCard studio={results[prevCard]} isActive={false} />
                    <ResultsCard studio={results[activeCard]} isActive={true} />
                    <ResultsCard studio={results[nextCard]} isActive={false} />
                </div>
            </div>
        </>
    );
};

export default Results;
