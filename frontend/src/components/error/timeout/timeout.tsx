import Sparkle from '../../../assets/svgs/sparkle.svg';

const TimeoutError = () => {
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold'>Request Timeout</h1>
            <img className='w-30 my-5' src={Sparkle} alt='Sparkling stars' />

            <p className='text-xl'>
                Back to{' '}
                <a className=' text-iris hover:text-medium-slate-blue' href='/'>
                    home
                </a>
            </p>
        </div>
    );
};

export default TimeoutError;
