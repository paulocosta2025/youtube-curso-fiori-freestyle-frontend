sap.ui.define([
    "sap/ui/core/mvc/Controller"
], 
    function (Controller){
        "use strict";

        return Controller.extend("br.com.petrobras.yspmtestenota.controller.View1", {
            onInit: function() {
                // //Model padrão da view
                // var oView = this.getView();
                // var oModel = new sap.ui.model.json.JSONModel();
                // oModel.setData({"usuario": {"nome": "Paulo Felipe"}});
                // oView.setModel(oModel);

                // Modelo local para controlar visibilidade
                var oLocalModel = new sap.ui.model.json.JSONModel({
                    showRespostas: false
                });
                this.getView().setModel(oLocalModel, "local");
  
                //Model com o nome "dados"
                var oView = this.getView();
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({"usuario": {"nome": "Paulo Cristiano"}});
                oView.setModel(oModel,"dados");

                //Model de formulários
                var oView = this.getView();
                var oModel = this.getOwnerComponent().getModel("formularios");

                // Obtém a lista original
                var aFormularios = oModel.getProperty("/formularios");

                // Transforma o campo valores (string com '|') em array de objetos
                aFormularios.forEach(function (item) {
                    if (item.tipo === "List" && typeof item.valores === "string") {
                        item.opcoes = item.valores.split("|").map(function (val, idx) {
                            return {
                                id: idx.toString(),
                                descricao: val.trim()
                            };
                        });
                    }
                });

                // Atualiza o modelo com os novos dados
                oModel.setProperty("/formularios", aFormularios);

                // Define o modelo na View 
                oView.setModel(oModel, "formularios"); 
            },

            onRespostas: function () {
                var oView = this.getView();

                // Alterna a visibilidade do painel (liga/desliga)
                var oLocalModel = oView.getModel("local");
                var bVisivel  = oLocalModel.getProperty("/showRespostas");
                oLocalModel.setProperty("/showRespostas", !bVisivel );                

                //Força o modelo "formularios" a atualizar os bindings (e chamar formatter)
                var oFormModel = oView.getModel("formularios");
                oFormModel.refresh(true); // true = force update                
            },

            formatRespostaCompleta: function (oItem) {
                if (!oItem || typeof oItem !== "object") {
                  return "(sem resposta)";
                }
              
                var sResposta = oItem.resposta;
                var sTipo = oItem.tipo;
                var aOpcoes = oItem.opcoes;
              
                // Se for tipo lista, procurar descrição
                if (sTipo === "List" && Array.isArray(aOpcoes)) {
                  var oOpcaoSelecionada = aOpcoes.find(function (opcao) {
                    return opcao.id === sResposta;
                  });
                  return oOpcaoSelecionada ? oOpcaoSelecionada.descricao : "(sem resposta)";
                }
              
                // Caso contrário, mostrar a resposta literal
                return sResposta || "(sem resposta)";
            },

            onTestModels: function () {
                //Model i18n
                var oI18n = this.getView().getModel("i18n").getResourceBundle();
                var sText = oI18n.getText("title");

                console.log("Texto com a chave 'title'");
                console.log(sText);

                console.log("----------------------------------------------")

                //Model de usuários
                var oModel = this.getOwnerComponent().getModel("usuarios");
                var oData = oModel.getData();
                console.log("Model dos usuários");
                console.log(oData);

                console.log("----------------------------------------------")
                
                //Model do serviço
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/NotasPmSub", {
                    success: function (oData,oResponse) {
                        console.log("Dados retornados do serviço")
                        console.log(oData);
                        console.log(oResponse);
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                });
            }
        });
    });