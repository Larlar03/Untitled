import Sparkle from '../../assets/svgs/sparkle.svg';

const UploadSuccess = () => {
    return (
        <div className='h-4/5 flex flex-col items-center justify-center'>
            <img className='w-40' src={Sparkle} alt='Sparkling stars' />
            <p className='mt-12' data-testid='upload-success-message'>
                Studio uploaded <span className=' text-iris'>successfully</span>.
            </p>
        </div>
    );
};

export default UploadSuccess;
