import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid';

interface Props {
    resultsTotal: number;
    activeCardNum: number;
    handleNextClick: () => void;
    handlePrevClick: () => void;
}

const ResultsNav = (props: Props) => {
    return (
        <div className='w-3/12 mx-auto text-xl lg:w-80 sm:font-bold mt-8 mb-2 '>
            <span className='flex flex-row justify-between text-cosmic-cobalt'>
                <ArrowSmallLeftIcon
                    onClick={props.handlePrevClick}
                    className='prev-arrow h-8 w-8 text-black hover:text-iris cursor-pointer'
                    data-testid='prev-arrow'
                />
                {props.resultsTotal === 0 ? '0 Results' : `${props.activeCardNum + 1} of ${props.resultsTotal}`}
                <ArrowSmallRightIcon
                    onClick={props.handleNextClick}
                    className=' next-arrow h-8 w-8 text-black hover:text-iris cursor-pointer'
                    data-testid='next-arrow'
                />
            </span>
        </div>
    );
};

export default ResultsNav;
