import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

const ResultsNav = ({
    resultsTotal,
    activeCardNum,
    handleNextClick,
    handlePrevClick
}: {
    resultsTotal: number;
    activeCardNum: number;
    handleNextClick: () => void;
    handlePrevClick: () => void;
}) => {
    return (
        <div className='w-7/12 flex flex-row flex-nowrap justify-between mt-10 mb-4 mx-auto text-xl md:w-80 md:font-bold'>
            <AdjustmentsHorizontalIcon className='h-6 w-6 text-main-100 hover:text-main-200 cursor-pointer' />
            <span className='w-full flex flex-row flex-nowrap justify-center gap-4'>
                <ArrowLeftCircleIcon
                    onClick={handlePrevClick}
                    className='prev-arrow h-8 w-8  text-black hover:text-main-200 cursor-pointer'
                />
                {activeCardNum + 1} of {resultsTotal}
                <ArrowRightCircleIcon
                    onClick={handleNextClick}
                    className=' next-arrow h-8 w-8 text-black hover:text-main-200 cursor-pointer'
                />
            </span>
            <Link to='/'>
                <ArrowUturnLeftIcon className='h-6 w-6 text-main-100 hover:text-main-200' />
            </Link>
        </div>
    );
};

export default ResultsNav;
