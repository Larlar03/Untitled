import Star from '../../assets/svgs/star.svg';

const Loading = () => {
    return (
        <>
            <div className='flex w-fit h-fit pl-2 m-2'>
                <div className={`animate-bounce w-6  mr-2`}>
                    <img src={Star} alt='Sparkling stars' />
                </div>
                <div className={`animate-[bounce_1s_infinite_200ms] w-6 rounded-full mr-2`}>
                    {' '}
                    <img src={Star} alt='Sparkling stars' />
                </div>
                <div className={`animate-[bounce_1s_infinite_400ms] w-6 rounded-full mr-2`}>
                    {' '}
                    <img src={Star} alt='Sparkling stars' />
                </div>
            </div>
        </>
    );
};

export default Loading;
