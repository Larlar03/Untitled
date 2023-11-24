import CtaButton from '../buttons/cta-button/cta-button';
import './login.css';
import User from '../../types/user';

interface Props {
    user: User;
    storeUsername: React.Dispatch<React.SetStateAction<string>>;
    storePassword: React.Dispatch<React.SetStateAction<string>>;
    handleLogin: () => void;
    error?: string;
}

const Login = (props: Props) => {
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        props.storeUsername(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        props.storePassword(value);
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
                            onChange={handleUsernameChange}
                            autoComplete='off'
                            value={props.user && props.user.username}
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
