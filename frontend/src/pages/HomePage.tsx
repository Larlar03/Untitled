import Header from '../components/header/Header';
import SearchForm from '../components/search/SearchForm';
import Navbar from '../components/navbar/Navbar';

interface Props {
    getStudios: (location: string, services: string[]) => void;
}

const HomePage = (props: Props) => {
    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 mx-auto'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Aerial & fitness classes near you.' />
                    <SearchForm getStudios={props.getStudios} />
                </div>
                <div id='page__card-shadow'></div>
            </div>
        </>
    );
};

export default HomePage;
