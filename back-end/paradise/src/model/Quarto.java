package model;

public class Quarto {

    private Long id_quarto;
    private int numero;
    private String tipo;
    private float valor_diaria;

    public int getNumero() {
        return numero;
    }
    public void setNumero(int numero) {
        this.numero = numero;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public float getValor_diaria() {
        return valor_diaria;
    }
    public void setValor_diaria(float valor_diaria) {
        this.valor_diaria = valor_diaria;
    }
    public Long getIdQuarto() {
        return id_quarto;
    }
    public void setIdQuarto(Long id_quarto) {
        this.id_quarto = id_quarto;
    }

    public Quarto(int numero, String tipo, float valor_diaria) {
        this.numero = numero;
        this.tipo = tipo;
        this.valor_diaria = valor_diaria;
    }

    public Quarto(Long id_quarto, int numero, String tipo, float valor_diaria) {
        this.id_quarto = id_quarto;
        this.numero = numero;
        this.tipo = tipo;
        this.valor_diaria = valor_diaria;
    }
    @Override
    public String toString() {
        return "Quarto [id=" + id_quarto + ", numero=" + numero + ", tipo=" + tipo + ", valor_diaria=" + valor_diaria + "]";
    }    
}
