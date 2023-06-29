import MagnifyingGlass from '../../../assets/svgs/magnifying-glass.svg';

const NoResults = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='mt-5 text-4xl font-medium mr-4'>There are 0 results</h1>
            <img className='w-80' src={MagnifyingGlass} alt='No results' />
            <p className='text-xl'>
                Go back to{' '}
                <a className=' text-main-purple-heart hover:text-main-cornflower-blue' href='/'>
                    search
                </a>
            </p>
        </div>
    );
};

export default NoResults;
