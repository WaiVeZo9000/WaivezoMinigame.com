import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import React from 'react';
import '../stylesheet/memGame.css'


// Define an interface for the component's props
interface SingleCardProps {
    card: {
        src: string;
    };
    cardBack: string;
    HandleChoice : Function;
    flipped : boolean;
    disable : boolean;
}

// Use the interface in the component
const SingleCard: React.FC<SingleCardProps> = ({ card, cardBack, HandleChoice, flipped, disable}) => {

    const HandleClick = () => {
        if (!disable){
            HandleChoice(card);
        }
        
    }

    return (
     
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img className='front' src={card.src} alt='card front' />
                <img
                className='back'
                src={cardBack} 
                alt='card back' 
                onClick={HandleClick}
                />
            </div>
        </div>
       
    );
}

export default SingleCard;
