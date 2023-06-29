import { PulseLoader } from 'react-spinners';
import Header from '../components/header/header';
import SearchForm from '../components/search/search-form';
import Navbar from '../components/navbar/navbar';

interface Props {
    getStudios: (location: string | undefined, services: string[]) => void;
    isLoading?: boolean;
}

const HomePage = (props: Props) => {
    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 my-auto mx-auto mt-2.5'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Aerial, pole & fitness classes near you.' />
                    {props.isLoading && (
                        <div className='h-4/6 w-full flex justify-center items-center'>
                            <PulseLoader
                                color='var(--mauve)'
                                size={50}
                                aria-label='Loading Spinner'
                                data-testid='loader'
                            />
                        </div>
                    )}
                    {!props.isLoading && <SearchForm getStudios={props.getStudios} />}
                </div>
                <div id='page__card-shadow'></div>
            </div>
        </>
    );
};

export default HomePage;
