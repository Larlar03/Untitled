import Header from '../components/header/Header';
import Results from '../components/results/Results';
import Navbar from '../components/navbar/Navbar';
import Studio from '../types/studios';

interface Props {
    results?: Studio[];
}

const ResultsPage = (props: Props) => {
    return (
        <>
            <Navbar />
            <div className='my-2'>
                <Header subheading='Results' />
                <Results results={props.results && props.results} />
            </div>
        </>
    );
};

export default ResultsPage;
