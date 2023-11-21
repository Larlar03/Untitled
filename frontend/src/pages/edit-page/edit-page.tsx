import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllStudiosApi } from '../../api/get-all-studios';
import Header from '../../components/header/header';
import Loading from '../../components/loading/loading';
import Studio from '../../types/studios';
import EditList from '../../components/edit/edit-list';

const EditPage = () => {
    const [studios, setStudios] = useState<Studio[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        getAllStudios();
    }, []);

    const getAllStudios = async () => {
        setLoading(true);

        try {
            const response = await getAllStudiosApi();

            setStudios(response);

            setTimeout(() => {
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error(error);
            navigate('/timeout');
        }
    };
    return (
        <>
            <div id='edit-page' className='h-auto min-h-screen flex justify-center items-center'>
                <div
                    id='edit-page__card'
                    className='w-full max-w-md h-auto bg-alabaster p-6 md:max-w-[476px] md:h-[650px] md:rounded-lg md:border-[1px] md:border-cosmic-cobalt md:shadow-cosmic-cobalt'
                >
                    <Header subheading='Edit a Studio' />
                    {loading && (
                        <div className='w-full h-4/6 flex justify-center items-center'>
                            <Loading />
                        </div>
                    )}
                    {!loading && <EditList results={studios} getAllStudios={getAllStudios} />}
                </div>
            </div>
        </>
    );
};

export default EditPage;
