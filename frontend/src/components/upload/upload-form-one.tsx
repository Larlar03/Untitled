import { useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import cities from '../../constants/cities';
import regions from '../../constants/regions';
import CitiesRegion from '../../types/cities-regions';
import countries from '../../constants/countries';
import './upload-form.css';

interface Props {
    goToFormPage: (pageNumber: number) => void;
}

const UploadFormOne = (props: Props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>();

    // On change to set disabled based on each input filled out

    return (
        <div className='mt-12'>
            <form action='submit'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='name'>Studio Name</label>
                        <input type='text' id='name' name='name' />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='phone-number'>Phone Number</label>
                        <input type='number' id='phone-number' name='phone-number' />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='text' id='email' name='email' />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='address'>Street Address</label>
                        <input type='text' id='address' name='address' />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='post-code'>City</label>
                        <select className='form-select' aria-label='Default select example'>
                            <option selected></option>
                            {cities.map((city: CitiesRegion) => {
                                return <option value={city.label}>{city.label}</option>;
                            })}
                        </select>
                    </span>

                    <span className='input-group'>
                        <label htmlFor='post-code'>Post Code</label>
                        <input type='text' id='post-code' name='post-code' />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='region'>Region</label>
                        <select className='form-select' aria-label='Default select example'>
                            <option selected></option>
                            {regions.map((region: CitiesRegion) => {
                                return <option value={region.label}>{region.label}</option>;
                            })}
                        </select>
                    </span>
                    <span className='input-group'>
                        <label htmlFor='country'>Country</label>
                        <select className='form-select' aria-label='Default select example'>
                            <option selected></option>
                            {countries.map((country: CitiesRegion) => {
                                return <option value={country.label}>{country.label}</option>;
                            })}
                        </select>
                    </span>
                </section>
                <div className='mt-8'>
                    <CtaButton
                        text='Next'
                        handleClick={() => props.goToFormPage(2)}
                        isDisabled={isDisabled}
                        type='button'
                    />
                </div>
            </form>
        </div>
    );
};

export default UploadFormOne;
