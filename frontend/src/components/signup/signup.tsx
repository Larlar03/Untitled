import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import CtaButton from '../buttons/cta-button/CtaButton';
import { EyeIcon } from '@heroicons/react/24/outline';
import { EyeSlashIcon } from '@heroicons/react/24/outline';

const SignUp = () => {
    const [isDisabled, setIsDisabled] = useState<boolean>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>({
        name: [],
        username: [],
        email: [],
        password: [],
        confirmPassword: []
    });

    const navigate = useNavigate();

    const handlePasswordToggle = (e: any) => {
        e?.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className='mt-12'>
            <form action='submit'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='first-name'>First Name</label>
                        <input type='text' id='first-name' name='first-name' />
                    </span>
                    <span className='input-group'>
                        <label htmlFor='last-name'>Last Name</label>
                        <input type='text' id='last-name' name='last-name' />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='text' id='email' name='email' />
                    </span>
                </section>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type={showPassword ? 'text' : 'password'} id='password' name='password' />
                    </span>
                    <button onClick={handlePasswordToggle}>
                        {showPassword ? (
                            <EyeSlashIcon className='password-icon' />
                        ) : (
                            <EyeIcon className='password-icon' />
                        )}
                    </button>
                </section>
                <section className='mb-8'>
                    <span className='input-group'>
                        <label htmlFor='confirm-password'>Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='confirm-password'
                            name='confirm-password'
                        />
                    </span>
                </section>
                <CtaButton text='Sign Up' handleClick={() => navigate('/')} isDisabled={isDisabled} type='submit' />
            </form>
        </div>
    );
};

export default SignUp;
