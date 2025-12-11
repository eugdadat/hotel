package api;

import static spark.Spark.*;

import spark.Filter;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;

import model.*;
import dao.*;
import service.LocacaoService; 

public class Api {

    private static final Gson gson = new Gson();
    // DAO
    private static final clienteDAO clienteDAO = new clienteDAO();
    private static final locacaoDAO locacaoDAO = new locacaoDAO();
    private static final quartoDAO quartoDAO = new quartoDAO(); 
    
    private static final LocacaoService locacaoService = new LocacaoService(); 

    private static final String APPLICATION_JSON = "application/json";
    
    public static void main(String[] args) {
        
        port(7777);

        // ... (Filtros after e before do CORS e JSON mantidos) ...

        after(new Filter() {
            @Override
            public void handle(Request request, Response response){
                response.type(APPLICATION_JSON);
            }
        });

        // gets
        get("/quartos", (request, response) -> {
            return gson.toJson(quartoDAO.buscarQuartos());
        });
        
        get("/clientes", (request, response) -> {
            return gson.toJson(clienteDAO.buscarClientes());
        });

         get("/locacao", (request, response) -> {
            return gson.toJson(locacaoDAO.buscarLocacao());
        });

        //post
        post("/clientes", (request, response) -> {
            try{
                Cliente cliente = gson.fromJson(request.body(), Cliente.class);
                clienteDAO.cadastrarCliente(cliente);

                response.status(201);
                return gson.toJson(cliente);
            }catch (Exception e){
                response.status(500);
                System.err.println("Erro ao processar requisição post /clientes: " + e.getMessage());
                e.printStackTrace();
                return "Erro ao criar cliente";
            }
        });

        //post
        post("/locacao", (request, response) -> {
            try{
                Locacao loc = gson.fromJson(request.body(), Locacao.class);
                locacaoService.realizarReserva(loc); 

                response.status(201);
                return gson.toJson(loc);
            }catch (RuntimeException e){
                response.status(400); // bad Request
                System.err.println("Erro de negócio na requisição post /locacao: " + e.getMessage());
                return e.getMessage();
            }
            catch (Exception e){
                response.status(500);
                System.err.println("Erro interno ao processar requisição post /locacao: " + e.getMessage());
                e.printStackTrace();
                return "Erro interno ao criar locação";
            }
        });

        // CORS para fazer a api funcionar
        options("/*", (request, response) -> {

            String reqHeaders = request.headers("Access-Control-Request-Headers");
            if (reqHeaders != null) {
                response.header("Access-Control-Allow-Headers", reqHeaders);
            }

            String reqMethod = request.headers("Access-Control-Request-Method");
            if (reqMethod != null) {
                response.header("Access-Control-Allow-Methods", reqMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            response.header("Access-Control-Allow-Headers", "*");
        });

        after((req, res) -> res.type(APPLICATION_JSON));
        System.out.println("API iniciada na porta 7777. Acesse: http://localhost:7777");

    }
}