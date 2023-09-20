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
        <div className='w-7/12 flex flex-row flex-nowrap justify-between mt-8 mb-4 mx-auto text-xl lg:w-80 lg:font-bold'>
            <span className='w-full flex flex-row flex-nowrap justify-center gap-8'>
                <ArrowSmallLeftIcon
                    onClick={props.handlePrevClick}
                    className='prev-arrow h-8 w-8  text-black hover:text-iris cursor-pointer'
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
