import React, { useState } from 'react';

// Assumimos que selectedRoom agora contém todos os dados necessários
// Ex: { id_quarto: 1, checkIn: '2025-12-20', checkOut: '2025-12-25', valor_total: 750.00, ...outros dados do quarto }

const ClientForm = ({ selectedRoom, onReservationSuccess }) => {
  const [formData, setFormData] = useState({
    nome: '',
    documento: '', // Renomeado para 'documento' (era CPF nos inputs)
    telefone: '',
    specialRequests: ''
  });
  
  // Estado para gerenciar o loading/spinner
  const [isLoading, setIsLoading] = useState(false); 
  
  // URL da API
  const CLIENTE_URL = "http://localhost:7777/clientes";
  const LOCACAO_URL = "http://localhost:7777/locacao";

  // --- Funções de Formatação (Mantidas) ---
  const formatCPF = (value) => { /* ... sua lógica de formatação ... */
    const numericValue = value.replace(/\D/g, '').slice(0, 11);
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6) return numericValue.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    if (numericValue.length <= 9) return numericValue.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value) => { /* ... sua lógica de formatação ... */
    const numericValue = value.replace(/\D/g, '').slice(0, 11);
    if (numericValue.length <= 2) return numericValue;
    if (numericValue.length <= 6) return numericValue.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    if (numericValue.length <= 10) return numericValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    return numericValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };
  
  // --- Manipuladores de Estado (Ajustados para usar os nomes corretos do state) ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let stateName = name; 

    if (name === 'CPF') {
      formattedValue = formatCPF(value);
      stateName = 'documento'; // Mapeia o nome do input (CPF) para o estado (documento)
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
      stateName = 'telefone'; // Mapeia o nome do input (phone) para o estado (telefone)
    } else if (name === 'name') {
      stateName = 'nome'; // Mapeia o nome do input (name) para o estado (nome)
    }
    // Para specialRequests, o nome já é o mesmo no input e no state
    
    setFormData(prevData => ({
      ...prevData,
      [stateName]: formattedValue
    }));
  };

  // Função para limpar formatação antes do envio
  const getCleanData = () => {
    return {
      nome: formData.nome,
      documento: formData.documento.replace(/\D/g, ''), // Limpa o CPF/Documento
      telefone: formData.telefone.replace(/\D/g, ''), // Limpa o Telefone
      // specialRequests não é enviado para o endpoint de cliente, mas mantido
    };
  };

  // --- Lógica Principal de Envio ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedRoom || !selectedRoom.id_quarto || !selectedRoom.checkIn || !selectedRoom.checkOut) {
      alert('Erro: Informações do quarto e datas estão incompletas.');
      setIsLoading(false);
      return;
    }

    const clientData = getCleanData();
    const cleanCPF = clientData.documento;
    const cleanPhone = clientData.telefone;

    // Validação de dados (mantida)
    if (cleanCPF.length !== 11) {
      alert('CPF deve conter 11 dígitos!');
      setIsLoading(false);
      return;
    }
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      alert('Telefone deve conter 10 ou 11 dígitos (com DDD)!');
      setIsLoading(false);
      return;
    }

    // 1. PRIMEIRA REQUISIÇÃO: Cadastrar Cliente
    try {
      const clientResponse = await fetch(CLIENTE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: clientData.nome,
          documento: clientData.documento,
          telefone: clientData.telefone,
        }),
      });

      if (!clientResponse.ok) {
        // Tenta obter mensagem de erro do backend
        const errorData = await clientResponse.json().catch(() => ({ message: 'Erro desconhecido ao cadastrar cliente.' }));
        throw new Error(`Erro ${clientResponse.status}: ${errorData.message || 'Falha ao cadastrar cliente.'}`);
      }

      const newClient = await clientResponse.json();
      const idCliente = newClient.id_cliente; // Supondo que o backend retorna o ID do novo cliente

      if (!idCliente) {
         throw new Error("O servidor não retornou o ID do cliente após o cadastro.");
      }

      // 2. SEGUNDA REQUISIÇÃO: Criar Locação (Reserva)
      const locacaoData = {
        id_cliente: idCliente,
        id_quarto: selectedRoom.id_quarto,
        data_entrada: selectedRoom.checkIn,
        data_saida: selectedRoom.checkOut,
        valor_total: selectedRoom.valor_diaria || 0.00, // Certifique-se que valor_total está no selectedRoom
        pedidos_especiais: formData.specialRequests // Incluindo o pedido especial aqui
      };

      const locacaoResponse = await fetch(LOCACAO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locacaoData),
      });

      if (!locacaoResponse.ok) {
        const errorData = await locacaoResponse.json().catch(() => ({ message: 'Erro desconhecido ao criar locação.' }));
        throw new Error(`Erro ${locacaoResponse.status}: ${errorData.message || 'Falha ao criar locação.'}`);
      }

      const newLocacao = await locacaoResponse.json();

      // Sucesso nas duas requisições
      alert('Reserva confirmada com sucesso! Cliente cadastrado e Locação criada.');
      
      // Chama a função de sucesso que deve estar no componente pai
      if (onReservationSuccess) {
          onReservationSuccess(newLocacao); 
      }

    } catch (error) {
      console.error('Erro na submissão:', error.message);
      alert(`Falha na reserva: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (restante do código JSX)
  return (
    <div className="client-form-container">
      {/* ... Informações do Quarto (mantidas) ... */}

      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label htmlFor="name">Nome Completo *</label>
          <input
            type="text"
            id="name"
            name="name" // Usado para mapear para o estado 'nome'
            value={formData.nome} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="CPF">CPF *</label>
          <input
            type="text"
            id="CPF"
            name="CPF" // Usado para mapear para o estado 'documento'
            value={formData.documento} 
            onChange={handleChange}
            // ... (atributos de formatação e validação) ...
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
            name="phone" // Usado para mapear para o estado 'telefone'
            value={formData.telefone}
            onChange={handleChange}
            // ... (atributos de formatação e validação) ...
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
            value={formData.specialRequests} // Agora precisa do value/state
            onChange={handleChange}
            rows="3"
            placeholder="Alguma solicitação especial?"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading || !selectedRoom || !selectedRoom.checkIn} // Desabilita durante o carregamento
        >
          {isLoading ? 'Reservando...' : 'Confirmar Reserva'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;