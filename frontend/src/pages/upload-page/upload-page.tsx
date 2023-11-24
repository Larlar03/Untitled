import { useEffect, useState } from 'react';
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

interface Props {
    formType?: string;
    isAdmin?: boolean;
    studioToEdit?: Studio | undefined;
    studioToEditId?: string | undefined;
}

const UploadPage = (props: Props) => {
    const [formType, setFormType] = useState<string>('Upload');
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

    // // Get props passed from edit page
    // const location = useLocation();
    // const locationProps = location.state || {};

    useEffect(() => {
        console.log(props);
        props.formType && setFormType(props.formType);
        props.studioToEdit
            ? setNewStudio(props.studioToEdit)
            : setNewStudio({
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
        props.studioToEditId ? setStudioId(props.studioToEditId) : setStudioId('');
    }, [props]);

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
        <>
            {isSubmitted ? (
                <>
                    <UploadSuccess type={formType} />
                </>
            ) : (
                <div className='px-2 '>
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
                </div>
            )}
        </>
    );
};

export default UploadPage;
