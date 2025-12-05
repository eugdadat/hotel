package model;

public class Cliente {
    
    private Long id_cliente;
    private String nome;
    private String documento;
    private String telefone;

    public Long getIdCliente() {
        return id_cliente;
    }
    public void setIdCliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDocumento() {
        return documento;
    }
    public void setDocumento(String documento) {
        this.documento = documento;
    }
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
    public Cliente(Long id_cliente, String nome, String documento, String telefone) {
        this.id_cliente = id_cliente;
        this.nome = nome;
        this.documento = documento;
        this.telefone = telefone;
    }
    public Cliente(String nome, String documento, String telefone) {
        this.nome = nome;
        this.documento = documento;
        this.telefone = telefone;
    }
    @Override
    public String toString() {
        return "Cliente [id=" + id_cliente + ", nome=" + nome + ", documento=" + documento + ", telefone=" + telefone + "]";
    }


    
}
