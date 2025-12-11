import { useState, useEffect } from 'react';
import React from 'react';
import RoomCard from './RoomCard';

const RoomList = ({ onRoomSelect, selectedRoom }) => {

  const [availableRooms, setAvailableRooms] = useState([])

  async function buscarQuartos() {
    try {
      const response = await fetch("http://localhost:7777/quartos")
      const data = await response.json()

      setAvailableRooms(data)
      console.log(availableRooms)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    buscarQuartos()
  }, [])
  

  return (
    <div className="room-list">
      <div className="rooms-grid">
        {availableRooms.map(room => (
          <RoomCard
            key={room.id_quarto}
            room={room}
            isSelected={selectedRoom?.id === room.id_quarto}
            onSelect={onRoomSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomList;