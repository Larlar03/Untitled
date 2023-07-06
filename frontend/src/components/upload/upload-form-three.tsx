import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CtaButton from '../buttons/cta-button/cta-button';
import services from '../../constants/services';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeServiceData: (e: any) => void;
    submitForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UploadForm = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>();

    const navigate = useNavigate();

    return (
        <form action='submit'>
            <div className='top'>
                <section className='mb-4' id='form-check-container'>
                    {services.map((service, i) => (
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
                <CtaButton
                    className='w-2/5'
                    text='Back'
                    handleClick={props.goToFormPage(2)}
                    isDisabled={isDisabled}
                    type='button'
                />
                <CtaButton
                    className='w-2/5'
                    text='Upload'
                    handleClick={props.submitForm}
                    isDisabled={isDisabled}
                    type='button'
                />
            </div>
        </form>
    );
};

export default UploadForm;
