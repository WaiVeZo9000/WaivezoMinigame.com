import React from 'react';

interface StarProps {
  selected: boolean;
  halfSelected?: boolean;
  onClick?: () => void;
}

const Star: React.FC<StarProps> = ({ selected, halfSelected, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: 'pointer',
        color: 'gray',
        position: 'relative',
        display: 'inline-block',
        fontSize: '40px',
      }}
    >
      {/* This renders the gray star background */}
      ☆
      {/* This renders the selected full gold star */}
      {selected && !halfSelected && (
        <span
          style={{
            color: 'gold',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            overflow: 'hidden',
            
          }}
        >
          ★
        </span>
      )}
      {/* This renders the half gold star */}
      {halfSelected && (
        <span
          style={{
            color: 'gold',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            overflow: 'hidden',
          }}
        >
          ★
        </span>
      )}
    </span>
  );
};

export default Star;
