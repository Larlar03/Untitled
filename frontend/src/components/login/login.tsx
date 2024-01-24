import CtaButton from '../buttons/cta-button/cta-button';
import './login.css';
import User from '../../types/user';

interface Props {
    user: User;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleLogin: () => void;
    error?: string;
}

const Login = (props: Props) => {
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        props.setEmail(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        props.setPassword(value);
    };

    return (
        <form action='submit' id='login-form' className='w-4/5 mx-auto'>
            <div className='top'>
                <section className='mb-4'>
                    <span className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            onChange={handleEmailChange}
                            autoComplete='off'
                            value={props.user && props.user.email}
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
                            onChange={handlePasswordChange}
                            autoComplete='off'
                            value={props.user && props.user.password}
                            onKeyDown={async (event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    props.handleLogin();
                                }
                            }}
                        />
                    </span>
                </section>
            </div>

            <div className='bottom flex flex-col '>
                <CtaButton text='Login' handleClick={() => props.handleLogin()} type='button' />
                <span className='text-error-crimson mt-3 mx-auto'>{props.error && props.error}</span>
            </div>
        </form>
    );
};

export default Login;
