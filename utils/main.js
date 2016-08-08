var fs = require('fs');

(function(messageFolder){
    var messageInfo = [];
 	var messages = fs.readdirSync(messageFolder);
    for(var i in messages){
        var fileName = messages[i];
        var contents = fs.readFileSync(messageFolder+'/'+ fileName, 'utf-8');
        var rows = contents.split('\n');
  		var singleMessage = {name:fileName};
        for(var j in rows){
        	if(rows[j].slice(0,4) === "From" ) {
                if(rows[j].slice(5).charAt(0) === " "){
                    singleMessage.from = rows[j].slice(6);
                } else {
                    singleMessage.from = rows[j].slice(5);
                }
        	}
        	if(rows[j].slice(0,4) === "Date" ) {
                if(rows[j].slice(5).charAt(0) === " "){
                    singleMessage.date = rows[j].slice(6);
                } else {
                    singleMessage.date = rows[j].slice(5);
                }
        	}
        	if(rows[j].slice(0,7) === "Subject") {
                if(rows[j].slice(8).charAt(0) === " "){
                    singleMessage.subject = rows[j].slice(9);
                } else {
                    singleMessage.subject = rows[j].slice(8);
                }
            }
        }
        if(singleMessage.from !== undefined && singleMessage.date !== undefined && singleMessage.subject !== undefined) {
    		messageInfo.push(singleMessage);
    	}
        fs.writeFileSync("results.json", JSON.stringify(messageInfo));
    }
    console.log(messageInfo)
    return messageInfo;
})('dataset');