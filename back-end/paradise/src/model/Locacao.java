package model;

public class Locacao {
    private Long id;
    private Long id_cliente;
    private Long id_quarto;
    private String data_entrada;
    private String data_saida;
    private float valor_total;

    public Locacao(Long id, Long id_cliente, Long id_quarto, String data_entrada, String data_saida,
            float valor_total) {
        this.id = id;
        this.id_cliente = id_cliente;
        this.id_quarto = id_quarto;
        this.data_entrada = data_entrada;
        this.data_saida = data_saida;
        this.valor_total = valor_total;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setId_cliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }

    public void setId_quarto(Long id_quarto) {
        this.id_quarto = id_quarto;
    }

    public void setData_entrada(String data_entrada) {
        this.data_entrada = data_entrada;
    }

    public void setData_saida(String data_saida) {
        this.data_saida = data_saida;
    }

    public void setValor_total(float valor_total) {
        this.valor_total = valor_total;
    }

    public Long getId() {
        return id;
    }

    public Long getId_cliente() {
        return id_cliente;
    }

    public Long getId_quarto() {
        return id_quarto;
    }

    public String getData_entrada() {
        return data_entrada;
    }

    public String getData_saida() {
        return data_saida;
    }

    public float getValor_total() {
        return valor_total;
    }

    @Override
    public String toString() {
        return "Locacao [id=" + id + ", id_cliente=" + id_cliente + ", id_quarto=" + id_quarto + ", data_entrada="
                + data_entrada + ", data_saida=" + data_saida + ", valor_total=" + valor_total + "]";
    }

    
    
    
    
}
