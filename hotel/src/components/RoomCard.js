import React from 'react';

const RoomCard = ({ room, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(room);
  };

  return (
    <div 
      className={`room-card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className="room-info">
        <h3>Quarto {room.number}</h3>
        <span className="room-type">{room.type}</span>
        <p className="room-bed">{room.bedType}</p>
        <div className="room-price">
          <strong>R$ {room.price}</strong> / noite
        </div>
        <button className={`select-button ${isSelected ? 'selected' : ''}`}>
          {isSelected ? '✓ Selecionado' : 'Selecionar'}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;