import Header from '../components/header/header';
import Navbar from '../components/navbar/navbar';
import UploadForm from '../components/upload/upload-form';

const UploadPage = (props: any) => {
    return (
        <>
            <Navbar />
            <div id='page' className='h-full max-w-md p-0 mx-auto'>
                <div id='page__card' className='px-11'>
                    <Header subheading='Sign Up' />
                    <UploadForm />
                </div>
                <div id='page__card--shadow'></div>
            </div>
        </>
    );
};

export default UploadPage;
