import Header from '../../components/header/header';
import SearchForm from '../../components/search/search-form';
import Loading from '../../components/loading/loading';

interface Props {
    getStudios: (location: string | undefined, services: string[]) => void;
    isLoading?: boolean;
}

const HomePage = (props: Props) => {
    return (
        <>
            {' '}
            <div id='home-page' className='h-auto min-h-screen flex justify-center mt-6'>
                <div
                    id='home-page__card'
                    className='w-full max-w-md p-6 bg-alabaster md:max-w-[476px] md:h-[725px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:shadow-cosmic-cobalt'
                >
                    <Header subheading='Aerial, pole & fitness classes near you.' />
                    {props.isLoading && (
                        <div className='w-full h-4/6 flex justify-center items-center'>
                            <Loading />
                        </div>
                    )}
                    {!props.isLoading && <SearchForm getStudios={props.getStudios} />}
                </div>
            </div>
        </>
    );
};

export default HomePage;
