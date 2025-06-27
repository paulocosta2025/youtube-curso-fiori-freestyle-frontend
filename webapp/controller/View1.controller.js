sap.ui.define([
    "sap/ui/core/mvc/Controller"
], 
    function (Controller){
        "use strict";

        return Controller.extend("br.com.petrobras.yspmtestenota.controller.View1", {
            onInit: function() {
                var oView = this.getView();
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({"usuario": {"nome": "Paulo Felipe"}});
                oView.setModel(oModel);
            },

            onExibirMensagem: function () {
                var oI18n  = this.getView().getModel("i18n").getResourceBundle();
                var oModel = this.getView().getModel();
                var oData  = oModel.getData();

                var sText = oI18n.getText("welcomeMsg",[oData.usuario.nome]);
                alert(sText);
            }

        });
    });