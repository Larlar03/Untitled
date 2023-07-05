import { useState, useEffect } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import cities from '../../constants/cities';
import regions from '../../constants/regions';
import CitiesRegion from '../../types/cities-regions';
import countries from '../../constants/countries';
import './upload-form.css';
import Studio from '../../types/studios';

interface Props {
    goToFormPage: (pageNumber: number) => void;
    storeNewStudioData: (e: any) => void;
    newStudio: any;
}
// TO DO
// Regex pattern for correct email, phone number and post code
// Do inline vaildation or disabled button

const UploadFormOne = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    // useEffect(() => {
    //     const fieldValues = Object.values(props.newStudio);
    //     fieldValues.length === 8 ? setIsDisabled(false) : setIsDisabled(true);
    // }, [props.newStudio]);

    return (
        <div className='mt-12'>
            <form action='submit'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='name'>Studio Name</label>
                        <input type='text' id='name' name='name' onChange={props.storeNewStudioData} />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='phone_number'>Phone Number</label>
                        <input type='tel' id='phone_number' name='phone_number' onChange={props.storeNewStudioData} />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='email_address'>Email Address</label>
                        <input
                            type='email'
                            id='email_address'
                            name='email_address'
                            onChange={props.storeNewStudioData}
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
                        />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='location.city'>City</label>
                        <select className='form-select' name='location.city' onChange={props.storeNewStudioData}>
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
                        <select className='form-select' name='location.region' onChange={props.storeNewStudioData}>
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
                        <select className='form-select' name='location.country' onChange={props.storeNewStudioData}>
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
                <div className='mt-8'>
                    <CtaButton
                        text='Next'
                        handleClick={(e: React.MouseEvent<HTMLButtonElement>) => [
                            e.preventDefault(),
                            props.goToFormPage(2)
                        ]}
                        isDisabled={isDisabled}
                        type='button'
                    />
                </div>
            </form>
        </div>
    );
};

export default UploadFormOne;
