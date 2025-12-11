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
import model.Locacao;


public class locacaoDAO {
    
    //=============
    // READ
    //=============
    public List<Locacao> buscarLocacao(){

        List<Locacao> locacao = new ArrayList<>();

        String sql = "SELECT id, id_cliente,id_quarto, data_entrada, data_saida, valor_total FROM locacao";

          try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
               Locacao loc = new Locacao(
                rs.getLong("id"),
                rs.getLong("id_cliente"),
                rs.getLong("id_quarto"),
                rs.getString("data_entrada"),
                rs.getString("data_saida"),
                rs.getFloat("valor_total")
               );
                locacao.add(loc);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar locações: " + e.getMessage());
            e.printStackTrace();
        }
        return locacao;
    }

    //=============
    // CREATE
    //=============
    public void cadastrarLocacao(Locacao loc){
        String sql = "INSERT INTO locacao (id_cliente,id_quarto, data_entrada, data_saida, valor_total) VALUES (?,?,?,?,?)";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setLong(1, loc.getId_cliente());
            stmt.setLong(2, loc.getId_quarto());
            stmt.setString(3, loc.getData_entrada());
            stmt.setString(4, loc.getData_saida());
            stmt.setFloat(5, loc.getValor_total());
            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    loc.setId(rs.getLong(1));
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao inserir locação: " + loc.getId() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
}
