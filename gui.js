module.exports = (function GUI() {
    function clearScreen(){
        for (var i = 0; i < 10; i++) {
            console.log();          
        }
    }
    var signals = [];

    function addSignal(signalName) {
        signals.push({
            name: signalName,
            slots: []
        });
    }

    function clearSignals(){
        signals = [];
    }

    function emitSignal(signalName, param) {
        for (var i = 0; i < signals.length; i++) {
            var currentSignal = signals[i];
            if (currentSignal.name === signalName) {
                var slots = currentSignal.slots;
                for (var slotIndex = 0; slotIndex < slots.length; slotIndex++) {
                    slots[slotIndex](param);
                }
            }
        }
    }

    var connect = function(connections) {
        for (var i = 0; i < connections.length; i++) {
            var connection = connections[i],
                signalName = connection[0],
                slot = connection[1];
            for (var signalIndex in signals) {
                var signal = signals[signalIndex];
                if(signal.name === signalName) {
                    signal.slots.push(slot);
                }
            }
        }
    };

    var Window = (function () {
        var waitUserAnswer = function() {
            var readline = require("readline");
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question("Make your choise. ", function(key) {
                rl.close();
                clearScreen();
                if(key === "<") {
                    emitSignal("returnPressed");
                }
                else{
                    emitSignal("keyPressed", key);
                }
            });
        };

        return function Window(){
            clearSignals();
            this.connect = connect;
            this.waitUserAnswer = waitUserAnswer;
            addSignal("keyPressed");
            addSignal("returnPressed"); 
        }
    })();

    function DefaultListWindow(pageData) {
        Window.call(this);
        var header = pageData.header || "";
        var menuNames = pageData.menuNames || [];
        this.show = function() {
            clearScreen();
            console.log("-------------------------------");
            console.log(header)
            console.log("-------------------------------");
            for (var i = 0; i < menuNames.length; i++) {
                console.log(i+". "+menuNames[i]);
            }
            this.waitUserAnswer();
        };
    }

    function DefaultInfoWindow(pageData) {
        Window.call(this);
        var header = pageData.header || "";
        var textInfo = pageData.textInfo;
        this.show = function(){
            console.log("-------------------------------");
            console.log(header)
            console.log("*********************");
            console.log(textInfo);
            console.log("*********************");
            this.waitUserAnswer();
        }
    }

    return {
        MyProcess: function() {
            this.DocumentsListWindow = function(documentsList) {
                var menuNames = [];
                for (var i = 0; i < documentsList.length; i++) {
                    var document = documentsList[i];
                    menuNames.push(
                        "[" + document.id + "] - " + document.creator
                    );
                }
                var pageData = {
                    header: "DOCUMENT LIST",
                    menuNames: menuNames
                }
                DefaultListWindow.call(this, pageData);
            };
            this.DocumentLinesWindow = function(document) {
                var menuNames = [];
                var documentLines = document.lines;
                for (var i = 0; i < documentLines.length; i++) {
                    var lager = documentLines[i];
                    menuNames.push(
                        "[" + lager.id + "] - " + lager.name + " (" + lager.count + ")"
                    );
                }
                var pageData = {
                    header: "DOCUMENT №"+document.id,
                    menuNames: menuNames
                }
                DefaultListWindow.call(this, pageData);
            };
            this.LagerInfoWindow = function(lager) {
                var pageData = {
                    header: "LAGER №"+lager.id+" INFORMATION:",
                    textInfo: lager.textInfo
                }
                DefaultInfoWindow.call(this, pageData);
            }
        }
    };
})();
