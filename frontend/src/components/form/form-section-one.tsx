import { useEffect, useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import cities from '../../constants/cities';
import regions from '../../constants/regions';
import CitiesRegion from '../../types/cities-regions';
import countries from '../../constants/countries';
import './form.css';
import Studio from '../../types/studios';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeNewStudioData: (e: any) => void;
    newStudio: Studio;
}

const FormSectionOne = (props: Props) => {
    const [validTelephone, setValidTelephone] = useState<boolean>(false);
    const [validEmail, setValidEmail] = useState<boolean>(false);

    const validate = () => {
        // const telephoneInput = document.getElementById('phone_number').value;
        const telephoneInput = (document.getElementById('phone_number') as HTMLInputElement).value;
        const emailInput = (document.getElementById('email_address') as HTMLInputElement).value;
        const telephonePattern = new RegExp('^(?:\\+44\\d{10}|0\\d{9,10})$');
        const emailPattern = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9.-]+$');

        if (telephoneInput.length > 0) {
            telephonePattern.test(telephoneInput) ? setValidTelephone(true) : setValidTelephone(false);
        } else {
            setValidTelephone(true);
        }

        if (emailInput.length > 0) {
            emailPattern.test(emailInput) ? setValidEmail(true) : setValidEmail(false);
        } else {
            setValidEmail(true);
        }
    };

    useEffect(() => {
        validate();
    }, [props.storeNewStudioData]);

    return (
        <form action='submit' id='form'>
            <div className='top'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='name'>Studio Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            onChange={props.storeNewStudioData}
                            autoComplete='off'
                            value={props.newStudio.name}
                        />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='phone_number'>
                            Phone Number {!validTelephone && <span className='text-error-crimson'>*</span>}
                        </label>
                        <input
                            type='tel'
                            id='phone_number'
                            name='phone_number'
                            onChange={props.storeNewStudioData}
                            value={props.newStudio.phone_number}
                        />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='email_address'>
                            Email Address {!validEmail && <span className='text-error-crimson'>*</span>}
                        </label>
                        <input
                            type='email'
                            id='email_address'
                            name='email_address'
                            onChange={props.storeNewStudioData}
                            autoComplete='off'
                            value={props.newStudio.email_address}
                        />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='location.address'>Street Address</label>
                        <input
                            type='text'
                            id='location.address'
                            name='location.address'
                            onChange={props.storeNewStudioData}
                            autoComplete='off'
                            value={props.newStudio.location?.address}
                        />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='location.post_code'>Post Code</label>
                        <input
                            type='text'
                            id='location.post_code'
                            name='location.post_code'
                            onChange={props.storeNewStudioData}
                            autoComplete='off'
                            value={props.newStudio.location?.post_code}
                        />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='location.city'>City</label>
                        <select
                            id='location.city'
                            className='form-select'
                            name='location.city'
                            onChange={props.storeNewStudioData}
                            value={props.newStudio.location?.city}
                        >
                            <option defaultValue=''></option>
                            {cities.map((city: CitiesRegion, i) => {
                                return (
                                    <option key={i} value={city.label}>
                                        {city.label}
                                    </option>
                                );
                            })}
                        </select>
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='location.region'>Region</label>
                        <select
                            id='location.region'
                            className='form-select'
                            name='location.region'
                            onChange={props.storeNewStudioData}
                            value={props.newStudio.location?.region}
                        >
                            <option defaultValue=''></option>
                            {regions.map((region: CitiesRegion, i) => {
                                return (
                                    <option key={i} value={region.label}>
                                        {region.label}
                                    </option>
                                );
                            })}
                        </select>
                    </span>
                    <span className='input-group'>
                        <label htmlFor='location.country'>Country</label>
                        <select
                            id='location.country'
                            className='form-select'
                            name='location.country'
                            onChange={props.storeNewStudioData}
                            value={props.newStudio.location?.country}
                        >
                            <option defaultValue=''></option>
                            {countries.map((country: CitiesRegion, i) => {
                                return (
                                    <option key={i} value={country.label}>
                                        {country.label}
                                    </option>
                                );
                            })}
                        </select>
                    </span>
                </section>
            </div>
            <div className='bottom'>
                <CtaButton text='Next' handleClick={() => props.goToFormPage(2)} type='button' />
            </div>
        </form>
    );
};

export default FormSectionOne;
