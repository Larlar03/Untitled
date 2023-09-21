import Header from '../../components/header/header';
import Results from '../../components/results/results';
import Navbar from '../../components/navbar/navbar';
import NoResults from '../../components/error/no-results/no-results';
import Studio from '../../types/studios';

interface Props {
    results?: Studio[] | undefined;
}

const ResultsPage = (props: Props) => {
    return (
        <>
            <Navbar />
            <div id='results-page' className='h-auto grid justify-center'>
                <Header subheading='Results' />
                {props.results && props.results.length > 0 ? (
                    <Results results={props.results && props.results} />
                ) : (
                    <div className='h-full mt-12'>
                        <NoResults />
                    </div>
                )}
            </div>
        </>
    );
};

export default ResultsPage;
