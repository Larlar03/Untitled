import { useEffect, useState } from 'react';
import UploadFormOne from './form-section-one';
import UploadFormTwo from './form-section-two';
import UploadFormThree from './form-section-three';
import UploadSuccess from './form-success';
import Modal from '../modal/warning-modal';

import { validateForm } from '../../utils/validate-form';
import uploadStudioApi from '../../api/upload-studio';
import updateStudioApi from '../../api/update-studio';

import Studio from '../../types/studio';
import Service from '../../types/service';

interface Props {
    formType?: string;
    studioToEdit?: Studio | undefined;
    studioToEditId?: string | undefined;
    services: Service[] | undefined;
}

const Form = (props: Props) => {
    const [formType, setFormType] = useState<string>('Upload');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [formSection, setFormSection] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [studioId, setStudioId] = useState<string>('');
    const [newStudio, setNewStudio] = useState<Studio>({
        name: '',
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

    const studioTemplate: Studio = {
        name: '',
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
    };

    useEffect(() => {
        props.formType && setFormType(props.formType);
        props.studioToEdit ? setNewStudio(props.studioToEdit) : setNewStudio(studioTemplate);
        props.studioToEditId ? setStudioId(props.studioToEditId) : setStudioId('');
    }, [props]);

    const goToFormSection = (section: number): void => {
        setFormSection(section);
    };

    const storeNewStudioData = (e: any) => {
        const value = e.currentTarget.value;
        const field = e.currentTarget.name;
        const ns: any = { ...newStudio };

        if (field.includes('.')) {
            const fieldArr = field.split('.');
            ns[fieldArr[0]][fieldArr[1]] = value;
        } else {
            ns[field] = value;
        }

        if (field === 'logo') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target?.result;
                ns['logo'] = contents;
            };
            reader.readAsDataURL(file);
        }

        setNewStudio(ns);
    };

    const storeServiceData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setNewStudio((prev) => {
            const servicesArr: string[] = [...(prev.services || [])];

            if (servicesArr.includes(value)) {
                const filteredServicesArr = servicesArr.filter((service: string) => service !== value);
                return { ...prev, services: filteredServicesArr };
            } else {
                servicesArr.push(value);
                return { ...prev, services: servicesArr };
            }
        });
    };

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            validateForm(newStudio);
            if (formType === 'Update') {
                update();
            } else {
                upload();
            }
        } catch (error: any) {
            setErrorMessage(error.message);
            setShowModal(true);
        }
    };

    const upload = async () => {
        const responseStatus = await uploadStudioApi(newStudio);

        if (responseStatus === 201) {
            setIsSubmitted(true);
        } else {
            setErrorMessage('An upload network error occurred');
            setShowModal(true);
        }
    };

    const update = async () => {
        delete newStudio._id;
        const responseStatus = await updateStudioApi(newStudio, studioId);

        if (responseStatus === 200) {
            setIsSubmitted(true);
        } else {
            setErrorMessage('An update network error occurred');
            setShowModal(true);
        }
    };

    return (
        <>
            {isSubmitted ? (
                <>
                    <UploadSuccess type={formType} />
                </>
            ) : (
                <div className='px-2 '>
                    {formSection === 1 && (
                        <UploadFormOne
                            goToFormSection={goToFormSection}
                            storeNewStudioData={storeNewStudioData}
                            newStudio={newStudio}
                        />
                    )}
                    {formSection === 2 && (
                        <UploadFormTwo
                            goToFormSection={goToFormSection}
                            storeNewStudioData={storeNewStudioData}
                            newStudio={newStudio}
                        />
                    )}
                    {formSection === 3 && (
                        <UploadFormThree
                            goToFormSection={goToFormSection}
                            services={props.services}
                            storeServiceData={storeServiceData}
                            newStudio={newStudio}
                            onSubmit={onSubmit}
                            formType={formType}
                        />
                    )}
                    {showModal && <Modal setShowModal={setShowModal} message={errorMessage} />}
                </div>
            )}
        </>
    );
};

export default Form;
