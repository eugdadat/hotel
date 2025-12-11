package service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.sql.SQLException;

import model.Locacao;
import dao.locacaoDAO;
import dao.quartoDAO; 

public class LocacaoService {
    
    private locacaoDAO locacaoDao = new locacaoDAO();
    private quartoDAO quartoDao = new quartoDAO();

    private long calcularNumeroDiarias(String dataEntrada, String dataSaida) {
        try {
            //compatível com input type="date"
            LocalDate entrada = LocalDate.parse(dataEntrada);
            LocalDate saida = LocalDate.parse(dataSaida);
            
            long dias = ChronoUnit.DAYS.between(entrada, saida);
            
            if (dias <= 0) {
                throw new IllegalArgumentException("A data de check-out deve ser posterior à data de check-in.");
            }
            return dias;
        } catch (Exception e) {
            System.err.println("Erro ao calcular diárias: " + e.getMessage());
            throw new RuntimeException("Falha na validação de datas da locação.", e); 
        }
    }
    
    public void realizarReserva(Locacao loc) {
        
        try {
            float valorDiaria = quartoDao.getValorDiaria(loc.getId_quarto());

            long numeroDiarias = calcularNumeroDiarias(loc.getData_entrada(), loc.getData_saida());
            
            float valorTotal = valorDiaria * numeroDiarias;
            loc.setValor_total(valorTotal);
            
            locacaoDao.cadastrarLocacao(loc);
            
        } catch (SQLException e) {
            System.err.println("Erro de persistência ao realizar a reserva: " + e.getMessage());
            throw new RuntimeException("Falha ao persistir a reserva no banco de dados.", e);
        }
    }
}