import CtaButton from '../buttons/cta-button/cta-button';
import Services from '../../constants/services';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeServiceData: (e: any) => void;
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UploadForm = (props: Props) => {
    return (
        <form action='submit'>
            <div className='top'>
                <section id='form-check-container'>
                    {Services.map((service, i) => (
                        <div className='form-check' key={i}>
                            <input
                                className='form-check__input'
                                type='checkbox'
                                value={service}
                                id='flexCheckDefault'
                                onChange={props.storeServiceData}
                            />
                            <label className='form-check__label ml-1.5' htmlFor='flexCheckDefault'>
                                {service}
                            </label>
                        </div>
                    ))}
                </section>
            </div>
            <div className='bottom flex justify-between w-full'>
                <CtaButton className='w-2/5' text='Back' handleClick={() => props.goToFormPage(2)} type='button' />
                <CtaButton
                    className='w-2/5'
                    text='Upload'
                    handleClick={(e: React.MouseEvent<HTMLButtonElement>) => props.onSubmit(e)}
                    type='button'
                />
            </div>
        </form>
    );
};

export default UploadForm;
