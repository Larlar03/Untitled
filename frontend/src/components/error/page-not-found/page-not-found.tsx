import BlinkingEye from '../../icons/blinking-eye/blinking-eye';
import './page-not-found.css';

const PageNotFound = () => {
    return (
        <div className=' h-screen w-screen flex flex-col justify-center items-center'>
            <div className='flex flex-row justify-center items-center'>
                <span className='text-9xl font-medium mr-4'>4</span>
                <BlinkingEye width='211' height='211' />
                <span className='text-9xl font-medium  ml-4'>4</span>
            </div>
            <h1 className='text-6xl font-bold mt-9'>Page Not Found</h1>
            <p className='text-xl mt-5'>
                Back to{' '}
                <a className=' text-main-purple-heart hover:text-main-cornflower-blue' href='/'>
                    home
                </a>
            </p>
        </div>
    );
};

export default PageNotFound;
