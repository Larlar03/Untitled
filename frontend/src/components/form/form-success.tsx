import Sparkle from '../../assets/svgs/sparkle.svg';

interface Props {
    type?: string;
}

const FormSuccess = (props: Props) => {
    console.log(props.type);
    return (
        <div className='h-4/5 flex flex-col items-center justify-center'>
            <img className='w-40' src={Sparkle} alt='Sparkling stars' />
            <p className='mt-12' data-testid='upload-success-message'>
                Studio {props.type && props.type === 'update' ? 'updated' : 'uploaded'}{' '}
                <span className=' text-iris'>successfully</span>.
            </p>
        </div>
    );
};

export default FormSuccess;
