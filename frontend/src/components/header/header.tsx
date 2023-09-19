import { Link } from 'react-router-dom';

interface Props {
    subheading: string;
}

const Header = (props: Props) => {
    return (
        <div className='text-center'>
            <h1 className='text-6xl mb-2 font-bold font-spacegrotesk no-underline hover:text-black'>
                <Link to='/'>aeriform</Link>
            </h1>
            <h2 className='text-xl font-normal font-spacemono'>{props.subheading}</h2>
        </div>
    );
};

export default Header;
