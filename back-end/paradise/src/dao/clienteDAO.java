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
import model.Cliente;

public class clienteDAO {
    
    //=============
    // READ
    //=============
    public List<Cliente> buscarClientes(){

        List<Cliente> clientes = new ArrayList<>();

        String sql = "SELECT id_cliente, nome, documento, telefone FROM cliente";

          try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Cliente cliente = new Cliente(
                        rs.getLong("id_cliente"),
                        rs.getString("nome"),
                        rs.getString("documento"),
                        rs.getString("telefone")
                    );
                clientes.add(cliente);
            }
        } catch (SQLException e) {
            System.err.println("Erro ao buscar clientes: " + e.getMessage());
            e.printStackTrace();
        }
        return clientes;
    }

    //=============
    // CREATE
    //=============
    public void cadastrarCliente(Cliente cliente){
        String sql = "INSERT INTO cliente (nome, documento, telefone) VALUES (?,?,?)";

        try (Connection conn = ConnectionFactory.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, cliente.getNome());
            stmt.setString(2, cliente.getDocumento());
            stmt.setString(3, cliente.getTelefone());
            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    cliente.setIdCliente(rs.getLong(1));
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao inserir cliente: " + cliente.getNome() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
