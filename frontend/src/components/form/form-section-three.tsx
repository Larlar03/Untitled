import CtaButton from '../buttons/cta-button/cta-button';
import './form.css';
import Studio from '../../types/studio';
import Service from '../../types/service';

interface Props {
    goToFormSection: (section: number) => void;
    storeServiceData: (e: any) => void;
    newStudio: Studio;
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
    formType?: string;
    services: Service[] | undefined;
}

const FormSectionThree = (props: Props) => {
    return (
        <form action='submit' id='form'>
            <div className='top flex justify-center'>
                <section id='form-check-container'>
                    {props.services?.map((service: any) => (
                        <div className='form-check' key={service._id}>
                            <input
                                className='form-check__input'
                                type='checkbox'
                                value={service.service}
                                id='flexCheckDefault'
                                onChange={props.storeServiceData}
                                checked={props.newStudio.services?.includes(service.service)}
                            />
                            <label className='form-check__label ml-1.5' htmlFor='flexCheckDefault'>
                                {service.service}
                            </label>
                        </div>
                    ))}
                </section>
            </div>
            <div className='bottom flex justify-between w-full'>
                <div className='w-2/5'>
                    <CtaButton text='Back' handleClick={() => props.goToFormSection(2)} type='button' />
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

export default FormSectionThree;
