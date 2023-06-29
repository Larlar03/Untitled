import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CtaButton from '../buttons/cta-button/cta-button';
import services from '../../constants/services';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
}

const UploadForm = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>();

    const [errors, setErrors] = useState<any>({});

    const navigate = useNavigate();

    return (
        <div className='mt-12'>
            <form action='submit'>
                <section className='mb-4 flex flex-col'>
                    {services.map((service) => (
                        <div className='form-check'>
                            <label className='form-check-label' htmlFor='flexCheckDefault'>
                                {service}
                            </label>
                            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault' />
                        </div>
                    ))}
                </section>
                <div className='button-container'>
                    <CtaButton
                        className='button-container__button'
                        text='Back'
                        handleClick={() => props.goToFormPage(2)}
                        isDisabled={isDisabled}
                        type='button'
                    />
                    <CtaButton
                        className='button-container__button'
                        text='Submit'
                        handleClick={() => navigate('/')}
                        isDisabled={isDisabled}
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
