import Sparkle from '../../assets/svgs/sparkle.svg';

const UploadSuccess = () => {
    return (
        <div className='h-3/5 flex flex-col items-center justify-center'>
            <img className='w-80' src={Sparkle} alt='Sparkling stars' />
            <p className='mt-6' data-testid='upload-success-message'>
                Studio uploaded <span className=' text-iris'>successfully</span>.
            </p>
        </div>
    );
};

export default UploadSuccess;
