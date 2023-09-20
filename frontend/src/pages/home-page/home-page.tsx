import { PulseLoader } from 'react-spinners';
import Header from '../../components/header/header';
import SearchForm from '../../components/search/search-form';
import Navbar from '../../components/navbar/navbar';
// import './home-page.css';

interface Props {
    getStudios: (location: string | undefined, services: string[]) => void;
    isLoading?: boolean;
}

const HomePage = (props: Props) => {
    return (
        <>
            <Navbar />
            <div id='home-page' className='h-auto min-h-screen grid justify-center'>
                <div
                    id='home-page__card'
                    className='w-full max-w-md p-6 bg-alabaster md:max-w-[476px] md:h-[725px] md:rounded-lg md:border-2 md:border-cosmic-cobalt absolute left-[50%] translate-x-[-50%] z-10'
                >
                    <Header subheading='Aerial, pole & fitness classes near you.' />
                    {props.isLoading && (
                        <div className='w-full h-4/6 flex justify-center items-center'>
                            <PulseLoader
                                color='var(--pale-violet)'
                                size={25}
                                aria-label='Loading Spinner'
                                data-testid='loader'
                            />
                        </div>
                    )}
                    {!props.isLoading && <SearchForm getStudios={props.getStudios} />}
                </div>
                <div
                    id='home-page__card--shadow'
                    className='md:w-[476px] md:h-[725px] md:shadow-xl rounded-lg bg-cosmic-cobalt absolute top-[13%] left-[52%] translate-x-[-50%] z-0'
                ></div>
            </div>
        </>
    );
};

export default HomePage;
