import CtaButton from '../buttons/cta-button/cta-button';
import Services from '../../constants/services';
import './upload-form.css';
import Studio from '../../types/studios';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeServiceData: (e: any) => void;
    newStudio: Studio;
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    formType?: string;
}

const UploadForm = (props: Props) => {
    return (
        <form action='submit' id='upload-form'>
            <div className='top flex justify-center'>
                <section id='form-check-container'>
                    {Services.map((service, i) => (
                        <div className='form-check' key={i}>
                            <input
                                className='form-check__input'
                                type='checkbox'
                                value={service}
                                id='flexCheckDefault'
                                onChange={props.storeServiceData}
                                checked={props.newStudio.services?.includes(service)}
                            />
                            <label className='form-check__label ml-1.5' htmlFor='flexCheckDefault'>
                                {service}
                            </label>
                        </div>
                    ))}
                </section>
            </div>
            <div className='bottom flex justify-between w-full'>
                <div className='w-2/5'>
                    <CtaButton text='Back' handleClick={() => props.goToFormPage(2)} type='button' />
                </div>
                <div className='w-2/5'>
                    <CtaButton
                        text={props.formType === 'Update' ? 'Update' : 'Upload'}
                        handleClick={(e: React.MouseEvent<HTMLButtonElement>) => props.onSubmit(e)}
                        type='button'
                    />
                </div>
            </div>
        </form>
    );
};

export default UploadForm;
