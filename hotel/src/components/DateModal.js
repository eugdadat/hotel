import React, { useState } from 'react';

const DateModal = ({ room, onConfirm, onClose }) => {
  const [dateData, setDateData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleChange = (e) => {
    setDateData({
      ...dateData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!dateData.checkIn || !dateData.checkOut) {
      alert('Por favor, selecione ambas as datas!');
      return;
    }

    if (new Date(dateData.checkIn) >= new Date(dateData.checkOut)) {
      alert('A data de check-out deve ser posterior à data de check-in!');
      return;
    }

    onConfirm(dateData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Selecionar Datas</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="room-modal-info">
          <h3>Quarto {room.numero} - {room.tipo}</h3>
          <p>{room.bedType}</p>
          <p className="room-price">R$ {room.valor_diaria}/noite</p>
        </div>

        <form onSubmit={handleSubmit} className="date-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="checkIn">Check-in *</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={dateData.checkIn}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOut">Check-out *</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={dateData.checkOut}
                onChange={handleChange}
                min={dateData.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="confirm-button">
              Confirmar Datas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateModal;