import React, { useState } from 'react';
import ClientForm from './components/ClientForm';
import RoomList from './components/RoomList';
import DateModal from './components/DateModal.js';
import './App.css';

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowDateModal(true);
  };

  const handleDateConfirm = (dateData) => {
    setSelectedRoom(prev => ({
      ...prev,
      ...dateData
    }));
    setShowDateModal(false);
  };

  const handleCloseModal = () => {
    setShowDateModal(false);
    setSelectedRoom(null);
  };

  const handleReservationSubmit = (clientData) => {
    if (!selectedRoom) {
      alert('Por favor, selecione um quarto primeiro!');
      return;
    }

    if (!selectedRoom.checkIn || !selectedRoom.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out!');
      return;
    }
    
    setReservationData({
      client: clientData,
      room: selectedRoom
    });
    
    alert('Reserva realizada com sucesso!');
    console.log('Dados da reserva:', { client: clientData, room: selectedRoom });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Hotel Paradise</h1>
        <p>Faça sua reserva online</p>
      </header>

      <div className="container">
        <div className="content">
          <div className="rooms-section">
            <h2>Quartos Disponíveis</h2>
            <RoomList 
              onRoomSelect={handleRoomSelect} 
              selectedRoom={selectedRoom}
            />
          </div>

          <div className="form-section">
            <h2>Dados do Cliente</h2>
            <ClientForm 
              onSubmit={handleReservationSubmit}
              selectedRoom={selectedRoom}
            />
          </div>
        </div>

        {reservationData && (
          <div className="reservation-summary">
            <h3>Reserva Confirmada!</h3>
            <div className="summary-details">
              <h4>Cliente:</h4>
              <p><strong>Nome:</strong> {reservationData.client.name}</p>
              <p><strong>CPF:</strong> {reservationData.client.CPF}</p>
              <p><strong>Telefone:</strong> {reservationData.client.phone}</p>
              
              <h4>Quarto:</h4>
              <p><strong>Tipo:</strong> {reservationData.room.type}</p>
              <p><strong>Número:</strong> {reservationData.room.number}</p>
              <p><strong>Preço:</strong> R$ {reservationData.room.price}/noite</p>

              <h4>Datas:</h4>
              <p><strong>Check-in:</strong> {reservationData.room.checkIn}</p>
              <p><strong>Check-out:</strong> {reservationData.room.checkOut}</p>
              <p><strong>Hóspedes:</strong> {reservationData.room.guests}</p>
            </div>
          </div>
        )}

        {showDateModal && selectedRoom && (
          <DateModal
            room={selectedRoom}
            onConfirm={handleDateConfirm}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;