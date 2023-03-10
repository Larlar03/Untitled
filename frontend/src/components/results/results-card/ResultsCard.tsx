import React from 'react';
import './ResultsCard.css';
import Studio from '../../../types/studios';
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
                        <div className='card__heading'>
                            <a
                                href={studio.social_links?.website}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <h3>{studio.name}</h3>
                            </a>
                            <h4>{studio.location?.city}</h4>
                        </div>
                        <div className='card__address'>
                            {studio.location?.address}
                            <br />
                            {studio.location?.city},{' '}
                            {studio.location?.post_code}
                        </div>
                        <div className='card__image-container'>
                            <img src={studio.logo} alt='placeholder' />
                        </div>
                        <div className='card__links'>
                            <a
                                href={studio.social_links?.instagram}
                                target='_blank'
                                rel='noreferrer'
                                className='card__links--instagram'
                            >
                                <InstagramIcon />
                            </a>
                            <a
                                href={studio.social_links?.facebook}
                                target='_blank'
                                rel='noreferrer'
                                className='card__links--facebook'
                            >
                                <FacebookIcon />
                            </a>
                        </div>
                        <div className='card__contact'>
                            <a href={studio.social_links?.website}>
                                {studio.social_links?.website}
                            </a>
                            <a href={`tel:${studio.phone_number}`}>
                                {studio.phone_number}
                            </a>
                        </div>
                    </div>
                    <div className='card__shadow'></div>
                </>
            )}
        </div>
    );
};

export default ResultsCard;
