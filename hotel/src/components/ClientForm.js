import React, { useState } from 'react';

const ClientForm = ({ onSubmit, selectedRoom }) => {
  const [formData, setFormData] = useState({
    name: '',
    CPF: '',
    phone: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedRoom) {
      alert('Por favor, selecione um quarto primeiro!');
      return;
    }

    if (!selectedRoom.checkIn || !selectedRoom.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out!');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="client-form-container">
      {selectedRoom ? (
        <div className="selected-room-info">
          <h4>Quarto Selecionado:</h4>
          <p><strong>{selectedRoom.type}</strong> - Quarto {selectedRoom.number}</p>
          <p><strong>Tipo:</strong> {selectedRoom.bedType}</p>
          <p><strong>Preço:</strong> R$ {selectedRoom.price}/noite</p>
          {selectedRoom.checkIn && (
            <>
              <p><strong>Check-in:</strong> {selectedRoom.checkIn}</p>
              <p><strong>Check-out:</strong> {selectedRoom.checkOut}</p>
              <p><strong>Hóspedes:</strong> {selectedRoom.guests}</p>
            </>
          )}
        </div>
      ) : (
        <div className="no-room-selected">
          <p>Selecione um quarto para continuar</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label htmlFor="name">Nome Completo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="CPF">CPF *</label>
          <input
            type="text"
            id="CPF"
            name="CPF"
            value={formData.CPF}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Pedidos Especiais</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            placeholder="Alguma solicitação especial?"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={!selectedRoom || !selectedRoom.checkIn}
        >
          {selectedRoom ? 'Confirmar Reserva' : 'Selecione um Quarto'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;