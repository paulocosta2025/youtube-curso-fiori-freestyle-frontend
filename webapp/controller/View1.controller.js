sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("br.com.petrobras.yspmtestenota.controller.View1", {
        onInit() {
        },

        onPress: function(){    
            alert("Hello World");
        }
    });
});