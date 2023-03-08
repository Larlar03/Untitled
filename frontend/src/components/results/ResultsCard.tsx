import React from 'react';
import './ResultsCard.css';
import Studio from '../../types/studios';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const ResultsCard = ({
    studio,
    isActive
}: {
    studio: Studio;
    isActive: boolean;
}) => {
    console.log(document.getElementsByClassName('card'));
    return (
        <div className='card-container' id={!isActive ? 'inactive' : ''}>
            {studio && (
                <>
                    <div className='card' key={studio.id}>
                        <div className='heading'>
                            <a
                                href={studio.social_links?.website}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <h3>{studio.name}</h3>
                            </a>
                            <h4>{studio.location?.city}</h4>
                        </div>
                        <div className='address'>
                            {studio.location?.address}
                            <br />
                            {studio.location?.city},{' '}
                            {studio.location?.post_code}
                        </div>
                        <div className='image-container'>
                            <img src={studio.logo} alt='placeholder' />
                        </div>
                        <div className='links'>
                            <a
                                href={studio.social_links?.instagram}
                                target='_blank'
                                rel='noreferrer'
                                className='instagram'
                            >
                                <InstagramIcon />
                            </a>
                            <a
                                href={studio.social_links?.facebook}
                                target='_blank'
                                rel='noreferrer'
                                className='facebook'
                            >
                                <FacebookIcon />
                            </a>
                        </div>
                        <div className='contact'>
                            <a href={studio.social_links?.website}>
                                {studio.social_links?.website}
                            </a>
                            <a href={`tel:${studio.phone_number}`}>
                                {studio.phone_number}
                            </a>
                        </div>
                    </div>
                    <div className='card-shadow'></div>
                </>
            )}
        </div>
    );
};

export default ResultsCard;
