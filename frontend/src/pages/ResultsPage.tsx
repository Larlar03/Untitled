import Header from '../components/header/header';
import Results from '../components/results/results';
import Navbar from '../components/navbar/navbar';
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
