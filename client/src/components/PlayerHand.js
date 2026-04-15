import React from 'react';
import PropTypes from 'prop-types';

const PlayerHand = ({ cards }) => {
    return (
        <div className="player-hand">
            {cards.length > 0 ? (
                cards.map((card, index) => (
                    <div key={index} className="card">
                        <img src={card.image} alt={card.name} />
                        <p>{card.name}</p>
                    </div>
                ))
            ) : (
                <p>No cards in hand.</p>
            )}
        </div>
    );
};

PlayerHand.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    })).isRequired,
};

export default PlayerHand;