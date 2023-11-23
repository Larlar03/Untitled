import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import userLoginApi from '../../api/user-login';

interface Props {
    adminLogin: React.Dispatch<React.SetStateAction<boolean>>;
    isAdmin: boolean;
}

const AdminPage = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        console.log('username', username);
        console.log('password', password);
    }, [username, password]);

    const handleLogin = async () => {
        const response = await userLoginApi(username, password);

        if (response === 200) {
            props.adminLogin(true);
        } else {
            handleLoginError();
            console.log('Access denied');
        }
    };

    // clear input and error message for incorrect password, set login states
    const handleLoginError = () => {
        setUsername('');
        setPassword('');
        setErrorMessage('Access denied');
    };

    // logout

    return (
        <div id='admin-page' className='h-auto min-h-screen flex justify-center items-center'>
            <div
                id='admin-page__card'
                className='w-full max-w-md h-auto bg-alabaster p-6 md:max-w-[476px] md:h-[650px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:shadow-cosmic-cobalt'
            >
                <Header subheading='Admin Login' />
                {props.isAdmin ? (
                    <p>edit/upload</p>
                ) : (
                    <Login
                        handleLogin={handleLogin}
                        user={{ username: username, password: password }}
                        storeUsername={setUsername}
                        storePassword={setPassword}
                        error={errorMessage}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
