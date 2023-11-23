import { useState } from 'react';
import CtaButton from '../buttons/cta-button/cta-button';
import './login-form.css';

interface Props {
    handleLogin: (username: string, password: string) => void;
}

const Login = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (field === 'username') {
            setUsername(value);
        } else if (field === 'password') {
            setPassword(value);
        }
    };

    return (
        <form action='submit' id='login-form' className='w-4/5 mx-auto'>
            <div className='top'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            onChange={handleChange}
                            autoComplete='off'
                            value={username}
                        />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={handleChange}
                            autoComplete='off'
                            value={password}
                        />
                    </span>
                </section>
            </div>
            <div className='bottom'>
                <CtaButton text='Login' handleClick={() => props.handleLogin(username, password)} type='button' />
            </div>
        </form>
    );
};

export default Login;
