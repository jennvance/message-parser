var fs = require('fs');

(function(messageFolder){
    var messageInfo = [];
 	var messages = fs.readdirSync(messageFolder);
    for (var i in messages){
        var fileName = messages[i];
        var contents = fs.readFileSync(messageFolder+'/'+ fileName, 'utf-8');
        var rows = contents.split('\n');
  		var singleMessage = {name:fileName};
        for (var j in rows){
            var  arr = rows[j].split(":");
            if (arr[0] === "From"){
                if(arr[1].charAt(0) === " "){
                    singleMessage.from = arr[1].slice(1);
                    console.log(arr[1].slice(1))
                } else {
                    singleMessage.from = arr[1];
                };
            }
            if (arr[0] === "Date"){
                if(arr[1].charAt(0) === " "){
                    singleMessage.date = arr[1].slice(1);
                } else {
                    singleMessage.date = arr[1];
                };
            }
            if (arr[0] === "Subject"){
                if(arr[1].charAt(0) === " "){
                    singleMessage.subject = arr[1].slice(1);
                } else {
                    singleMessage.subject = arr[1];
                };
            }
        };
        if (singleMessage.from !== undefined && singleMessage.date !== undefined && singleMessage.subject !== undefined) {
    		messageInfo.push(singleMessage);
    	};
        fs.writeFileSync("results.json", JSON.stringify(messageInfo));
    };
    console.log(messageInfo)
    return messageInfo;
})('dataset');