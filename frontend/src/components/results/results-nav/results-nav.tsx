import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

interface Props {
    resultsTotal: number;
    activeCardNum: number;
    handleNextClick: () => void;
    handlePrevClick: () => void;
}

const ResultsNav = (props: Props) => {
    return (
        <div className='w-7/12 flex flex-row flex-nowrap justify-between mt-10 mb-4 mx-auto text-xl lg:w-80 lg:font-bold'>
            <AdjustmentsHorizontalIcon className='h-6 w-6 text-cosmic-cobalt hover:text-main-iris cursor-pointer' />
            <span className='w-full flex flex-row flex-nowrap justify-center gap-4'>
                <ArrowLeftCircleIcon
                    onClick={props.handlePrevClick}
                    className='prev-arrow h-8 w-8  text-black hover:text-main-iris cursor-pointer'
                    data-testid='prev-arrow'
                />
                {props.resultsTotal === 0 ? '0 Results' : `${props.activeCardNum + 1} of ${props.resultsTotal}`}
                <ArrowRightCircleIcon
                    onClick={props.handleNextClick}
                    className=' next-arrow h-8 w-8 text-black hover:text-main-iris cursor-pointer'
                    data-testid='next-arrow'
                />
            </span>
            <Link to='/'>
                <ArrowUturnLeftIcon
                    className='h-6 w-6 text-cosmic-cobalt hover:text-main-iris'
                    data-testid='return-arrow'
                />
            </Link>
        </div>
    );
};

export default ResultsNav;
