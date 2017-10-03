module.exports = (function(){
    var GUI = require("./gui");
    var model = require("./model");
    var gui = new GUI.MyProcess();

    var window;

    var showDocumentListWindow = function(){
        var documentList = model.getDocumentList();
        window = new gui.DocumentsListWindow(documentList);
        window.connect([
            ["keyPressed", keyPressedSlot],
            ["returnPressed", returnPressedSlot]
        ])
        window.show();

        function keyPressedSlot(key){
            var chosenDocumentId = documentList[key].id;
            showDocumentWindow(chosenDocumentId);
        };
        function returnPressedSlot(){
            console.log("GOOD BYE!");
        }
    }

    var showDocumentWindow = function(documentId){
        var document = model.getDocument(documentId);
        window = new gui.DocumentLinesWindow(document);
        window.connect([
            ["keyPressed", keyPressedSlot],
            ["returnPressed", returnPressedSlot]
        ])
        window.show();

        function keyPressedSlot(key){
            var chosenLagerId = document.lines[key].id;
            showLagerInfoWindow(chosenLagerId, documentId);
        }
        function returnPressedSlot(){
            showDocumentListWindow();
        }
    }

    var showLagerInfoWindow = function(lagerId, documentId){
        var lager = model.getLager(lagerId);
        window = new gui.LagerInfoWindow(lager);
        window.connect([
            ["returnPressed", returnPressedSlot]
        ])
        window.show();
        function returnPressedSlot(){
            showDocumentWindow(documentId);
        }
    }

    return {
        start: function(){
            showDocumentListWindow();
        }
    }
})();
