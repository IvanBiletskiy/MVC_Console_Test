/**
 * Выводит в console.log содержимое объекта
 * @param {Object} obj - объект 
 * @param {string} objName - имя объекта
 */
module.exports = function showObject(obj, objName){
    console.log("IVAN. -------------------"+objName+"--------------------------------");
    var level = 0;
    function getOtstup(){
       var otstup = ""
       for (var i = 0; i < level; i++) {
           otstup+="    ";
       }
       return otstup;
    };
    function logObjProperties(obj) {
        for (var key in obj){
            switch (typeof obj[key]) {
                case "object":
                    console.log(getOtstup() + key + " = {");
                    level++;
                    logObjProperties(obj[key]);
                    level--;
                    console.log(getOtstup() + "}")
                    break;
                default:
                    console.log(getOtstup() + key + " = " + obj[key]);
                    break;
            }
        } 
    }
    if (!obj || (typeof obj === "string")) {
        console.log(obj);
    }
    else {
        logObjProperties(obj);
    }
    console.log("IVAN. ------------------------------------------------------------------");
}

