import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAllStudiosApi from '../../api/get-all-studios';
import EditList from './edit-list';
import Loading from '../loading/loading';
import Studio from '../../types/studio';

interface Props {
    showForm: (
        event: React.MouseEvent<HTMLButtonElement>,
        formType: string,
        studioId: string | undefined,
        studio: Studio | undefined
    ) => void;
}

const Edit = (props: Props) => {
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
            }, 1000);
        } catch (error) {
            console.error(error);
            navigate('/timeout');
        }
    };
    return (
        <>
            {loading && (
                <div className='w-full h-4/6 flex justify-center items-center'>
                    <Loading />
                </div>
            )}
            {!loading && <EditList studios={studios} getAllStudios={getAllStudios} showForm={props.showForm} />}
        </>
    );
};

export default Edit;
