package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import util.ConnectionFactory;
import model.Quarto;

public class quartoDAO {
    //=============
    // READ
    //=============
    public List<Quarto> buscarQuartos(){

        List<Quarto> quartos = new ArrayList<>();

        String sql = "SELECT id_quarto, numero, tipo, valor_diaria FROM quarto";

          try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Quarto quarto = new Quarto(
                        rs.getLong("id_quarto"),
                        rs.getInt("numero"),
                        rs.getString("tipo"),
                        rs.getFloat("valor_diaria")
                    );
                quartos.add(quarto);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar quartos: " + e.getMessage());
            e.printStackTrace();
        }
        return quartos;
    }

    public float getValorDiaria(long id_quarto) throws SQLException {
        String sql = "SELECT valor_diaria FROM quarto WHERE id_quarto = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, id_quarto);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getFloat("valor_diaria");
                }
            }
        }
        throw new SQLException("Quarto com ID " + id_quarto + " não encontrado.");
    }
    
}
