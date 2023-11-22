import MagnifyingGlass from '../../../assets/svgs/magnifying-glass.svg';

const NoResults = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='mt-12 text-4xl font-medium mr-4'>0 results</h1>
            <img className='w-40 my-6' src={MagnifyingGlass} alt='Magnifying glass with stars' />
            <p className='text-xl'>
                Back to{' '}
                <a className=' text-iris hover:text-medium-slate-blue' href='/'>
                    home
                </a>
            </p>
        </div>
    );
};

export default NoResults;
