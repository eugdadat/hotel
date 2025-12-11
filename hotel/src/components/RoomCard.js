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
        <h3>Quarto {room.numero}</h3>
        <span className="room-type">{room.tipo}</span>
        <div className="room-price">
          <strong>R$ {room.valor_diaria}</strong> / noite
        </div>
        <button className={`select-button ${isSelected ? 'selected' : ''}`}>
          {isSelected ? '✓ Selecionado' : 'Selecionar'}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;