import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import UploadFormOne from '../../components/upload/upload-form-one';
import UploadFormTwo from '../../components/upload/upload-form-two';
import UploadFormThree from '../../components/upload/upload-form-three';
import UploadSuccess from '../../components/upload/upload-success';

import Modal from '../../components/modal/warning-modal';
import { validateForm } from '../../utils/validate-form';
import uploadStudioApi from '../../api/upload-studio';
import updateStudioApi from '../../api/update-studio';

import Studio from '../../types/studios';
import placeholderImageData from '../../constants/placeholder-image-data';
import { useLocation } from 'react-router-dom';

interface Props {
    formType?: string;
}

const UploadPage = (props: Props) => {
    const [formType, setFormType] = useState<string>('upload');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [formPage, setFormPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [studioId, setStudioId] = useState<string>('');
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
        logo: placeholderImageData,
        services: []
    });

    // Get props passed from edit page
    const location = useLocation();
    const locationProps = location.state || {};

    useEffect(() => {
        props.formType && setFormType(props.formType);

        //  Set props passed from edit page
        locationProps.type && setFormType(locationProps.type);
        locationProps.studioToEdit && setNewStudio(locationProps.studioToEdit);
        locationProps.studioToEditId && setStudioId(locationProps.studioToEditId);
    }, []);

    const goToFormPage = (pageNumber: number): void => {
        setFormPage(pageNumber);
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
            if (formType === 'update') {
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
        const responseStatus = await updateStudioApi(newStudio, studioId);

        if (responseStatus === 204) {
            setIsSubmitted(true);
        } else {
            setErrorMessage('An update network error occurred');
            setShowModal(true);
        }
    };

    return (
        <div id='upload-page' className='h-auto min-h-screen flex justify-center items-center'>
            <div
                id='upload-page__card'
                className='w-full max-w-md h-auto bg-alabaster p-6 md:max-w-[476px] md:h-[650px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:shadow-cosmic-cobalt'
            >
                <Header subheading='Upload a Studio' />
                {isSubmitted ? (
                    <>
                        <UploadSuccess type={formType} />
                    </>
                ) : (
                    <>
                        {formPage === 1 && (
                            <UploadFormOne
                                goToFormPage={goToFormPage}
                                storeNewStudioData={storeNewStudioData}
                                newStudio={newStudio}
                            />
                        )}
                        {formPage === 2 && (
                            <UploadFormTwo
                                goToFormPage={goToFormPage}
                                storeNewStudioData={storeNewStudioData}
                                newStudio={newStudio}
                            />
                        )}
                        {formPage === 3 && (
                            <UploadFormThree
                                goToFormPage={goToFormPage}
                                storeServiceData={storeServiceData}
                                newStudio={newStudio}
                                onSubmit={onSubmit}
                                formType={formType}
                            />
                        )}
                        {showModal && <Modal setShowModal={setShowModal} message={errorMessage} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default UploadPage;
