import Sparkle from '../../assets/svgs/sparkle.svg';

const UploadSuccess = () => {
    return (
        <div className='h-4/5 flex flex-col items-center justify-center'>
            <img className='w-80' src={Sparkle} alt='Magnifying glass with sparkles' />
            <p className='text-xl mt-6' data-testid='upload-success-message'>
                Studio uploaded <span className=' text-main-purple-heart'>successfully</span>.
            </p>
        </div>
    );
};

export default UploadSuccess;
