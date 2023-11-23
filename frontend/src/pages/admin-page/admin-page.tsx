import { useState } from 'react';
import Header from '../../components/header/header';
import Login from '../../components/login/login';

const AdminPage = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // API call, pass to login page
    const handleLogin = (username: string, password: string) => {
        console.log('username', username);
        console.log('password', password);
    };

    return (
        <div id='admin-page' className='h-auto min-h-screen flex justify-center items-center'>
            <div
                id='admin-page__card'
                className='w-full max-w-md h-auto bg-alabaster p-6 md:max-w-[476px] md:h-[650px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:shadow-cosmic-cobalt'
            >
                <Header subheading='Admin Login' />
                {isAdmin ? <p>edit/upload</p> : <Login handleLogin={handleLogin} />}
            </div>
        </div>
    );
};

export default AdminPage;
