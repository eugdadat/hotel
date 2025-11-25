import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ onRoomSelect, selectedRoom }) => {
  // Dados mockados dos quartos - simplificados
  const availableRooms = [
    {
      id: 1,
      number: '101',
      type: 'Solteiro',
      price: 120,
      bedType: 'Cama de solteiro'
    },
    {
      id: 2,
      number: '102',
      type: 'Solteiro',
      price: 120,
      bedType: 'Cama de solteiro'
    },
    {
      id: 3,
      number: '201',
      type: 'Casal',
      price: 200,
      bedType: 'Cama de casal'
    },
    {
      id: 4,
      number: '202',
      type: 'Casal',
      price: 200,
      bedType: 'Cama de casal'
    },
    {
      id: 5,
      number: '301',
      type: 'Casal Luxo',
      price: 300,
      bedType: 'Cama de casal king size'
    }
  ];

  return (
    <div className="room-list">
      <div className="rooms-grid">
        {availableRooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={selectedRoom?.id === room.id}
            onSelect={onRoomSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomList;