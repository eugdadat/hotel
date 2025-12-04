import React, { useState } from 'react';

const ClientForm = ({ onSubmit, selectedRoom }) => {
  const [formData, setFormData] = useState({
    name: '',
    CPF: '',
    phone: '',
    specialRequests: ''
  });

  // Função para aplicar máscara de CPF
  const formatCPF = (value) => {
    // Remove tudo que não é número
    const numericValue = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedValue = numericValue.slice(0, 11);
    
    // Aplica a máscara: 000.000.000-00
    if (limitedValue.length <= 3) {
      return limitedValue;
    } else if (limitedValue.length <= 6) {
      return limitedValue.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else if (limitedValue.length <= 9) {
      return limitedValue.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
      return limitedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  };

  // Função para aplicar máscara de telefone
  const formatPhone = (value) => {
    // Remove tudo que não é número
    const numericValue = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (com DDD + 9 dígitos)
    const limitedValue = numericValue.slice(0, 11);
    
    // Aplica a máscara apropriada
    if (limitedValue.length <= 2) {
      return limitedValue;
    } else if (limitedValue.length <= 6) {
      return limitedValue.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    } else if (limitedValue.length <= 10) {
      return limitedValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return limitedValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  // Validação de teclas para permitir apenas números e teclas de controle
  const handleNumericKeyDown = (e) => {
    const allowedKeys = [
      'Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter'
    ];
    
    // Permite apenas números e teclas de controle
    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Aplica formatação específica para cada campo
    if (name === 'CPF') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  // Função para remover formatação antes de enviar
  const getCleanData = () => {
    return {
      ...formData,
      CPF: formData.CPF.replace(/\D/g, ''),
      phone: formData.phone.replace(/\D/g, '')
    };
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

    // Validação do CPF (deve ter 11 dígitos)
    const cleanCPF = formData.CPF.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      alert('CPF deve conter 11 dígitos!');
      return;
    }

    // Validação do telefone (mínimo 10 dígitos)
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      alert('Telefone deve conter 10 ou 11 dígitos (com DDD)!');
      return;
    }

    // Envia os dados limpos (sem formatação)
    onSubmit(getCleanData());
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
            onKeyDown={handleNumericKeyDown}
            placeholder="000.000.000-00"
            maxLength={14}
            required
          />
          <small className="hint">Formato: 000.000.000-00 (11 dígitos)</small>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onKeyDown={handleNumericKeyDown}
            placeholder="(00) 00000-0000"
            maxLength={15}
            required
          />
          <small className="hint">Formato: (00) 00000-0000 (com DDD)</small>
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