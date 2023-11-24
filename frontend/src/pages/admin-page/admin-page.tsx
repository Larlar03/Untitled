import { useState } from 'react';
import userLoginApi from '../../api/user-login';
import Header from '../../components/header/header';
import AdminNavbar from '../../components/navbar/admin-navbar';
import Login from '../../components/login/login';
import EditPage from '../edit-page/edit-page';
import Form from '../../components/form/form';
import Studio from '../../types/studios';

interface Props {
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPage = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>();
    const [view, setView] = useState<string>('');
    const [formType, setFormType] = useState<string>('');
    const [studioToEditId, setStudioToEditId] = useState<string | undefined>();
    const [studioToEdit, setStudioToEdit] = useState<Studio | undefined>();

    const handleLogin = async () => {
        const response = await userLoginApi(username, password);

        if (response === 200) {
            props.setIsAdmin(true);
        } else {
            handleLoginError();
        }
    };

    const handleLoginError = () => {
        setUsername('');
        setPassword('');
        setErrorMessage('Access denied');
    };

    const handleLogout = () => {
        setUsername('');
        setPassword('');
        props.setIsAdmin(false);
    };

    const showForm = (
        event: React.MouseEvent<HTMLButtonElement>,
        formType: string,
        studioId: string | undefined,
        studio: Studio | undefined
    ) => {
        event.preventDefault();

        setFormType(formType);
        setStudioToEditId(studioId);
        setStudioToEdit(studio);

        setView('form');
    };

    return (
        <div id='admin-page' className='h-auto min-h-screen flex flex-col justify-center items-center'>
            <AdminNavbar handleLogout={handleLogout} showForm={showForm} setView={setView} />
            <div
                id='admin-page__card'
                className='w-full max-w-md h-auto bg-alabaster p-6 md:max-w-[476px] md:h-[650px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:shadow-cosmic-cobalt'
            >
                {!props.isAdmin ? (
                    <>
                        <Header subheading='Admin Login' />

                        <Login
                            handleLogin={handleLogin}
                            user={{ username: username, password: password }}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            error={errorMessage}
                        />
                    </>
                ) : (
                    (() => {
                        switch (view) {
                            case 'edit':
                                return (
                                    <>
                                        <Header subheading='Edit a Studio' />
                                        <EditPage showForm={showForm} />
                                    </>
                                );
                            case 'form':
                                return (
                                    <>
                                        <Header
                                            subheading={
                                                formType === 'Update'
                                                    ? `${formType} ${studioToEdit?.name}`
                                                    : `${formType} a Studio`
                                            }
                                        />
                                        <Form
                                            formType={formType}
                                            studioToEdit={studioToEdit}
                                            studioToEditId={studioToEditId}
                                        />
                                    </>
                                );

                            default:
                                return (
                                    <>
                                        <Header subheading='Edit a Studio' />
                                        <EditPage showForm={showForm} />
                                    </>
                                );
                        }
                    })()
                )}
            </div>
        </div>
    );
};

export default AdminPage;
