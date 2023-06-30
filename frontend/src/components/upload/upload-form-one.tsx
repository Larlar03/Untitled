import { useState, useEffect } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import cities from '../../constants/cities';
import regions from '../../constants/regions';
import CitiesRegion from '../../types/cities-regions';
import countries from '../../constants/countries';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
}
// TO DO
// Regex pattern for correct email, phone number and post code

const UploadFormOne = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [newStudio, setNewStudio] = useState<Studio>({
        name: '',
        phone_number: '',
        email_address: '',
        location: {
            address: '',
            post_code: '',
            city: '',
            region: '',
            country: ''
        },
        social_links: {
            website: '',
            instagram: '',
            facebook: ''
        },
        logo: '',
        services: []
    });

    const storeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const field = e.currentTarget.name;
        console.log('field', field);

        const ns = { ...newStudio };
        ns[field] = value;
        setNewStudio(ns);
        console.log(newStudio);
    };

    useEffect(() => {
        const occupiedFields = [];
        const fieldValues = Object.values(newStudio);
        fieldValues.forEach((val) => {
            val.length > 0 && occupiedFields.push(val);
        });
        occupiedFields.length === 8 && setIsDisabled(false);
    }, [newStudio]);

    return (
        <div className='mt-12'>
            <form action='submit'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='name'>Studio Name</label>
                        <input type='text' id='name' name='name' onChange={storeData} />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='phone_number'>Phone Number</label>
                        <input type='number' id='phone_number' name='phone_number' onChange={storeData} />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='email_address'>Email Address</label>
                        <input type='email' id='email_address' name='email_address' onChange={storeData} />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='location.address'>Street Address</label>
                        <input type='text' id='location.address' name='loaction.address' onChange={storeData} />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='location.post_code'>Post Code</label>
                        <input type='text' id='location.post_code' name='location.post_code' onChange={storeData} />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='location.city'>City</label>
                        <select className='form-select' name='location.city' onChange={storeData}>
                            <option defaultValue></option>
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
                        <select className='form-select' name='location.region' onChange={storeData}>
                            <option defaultValue></option>
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
                        <select className='form-select' name='location.country' onChange={storeData}>
                            <option defaultValue></option>
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
