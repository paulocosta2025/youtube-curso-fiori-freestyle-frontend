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

                //Model com o nome "dados"
                var oView = this.getView();
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({"usuario": {"nome": "Paulo Cristiano"}});
                oView.setModel(oModel,"dados");
            },

            onExibirMensagem: function () {
                var oI18n  = this.getView().getModel("i18n").getResourceBundle();
                var oModel = this.getView().getModel();
                var oData  = oModel.getData();

                var sText = oI18n.getText("welcomeMsg",[oData.usuario.nome]);
                alert(sText);
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