var fs = require('fs');

(function(messageFolder){
    var messageInfo = [];
    var finalresult = "";
 	var messages = fs.readdirSync(messageFolder);
    for (var i in messages){
        var fileName = messages[i];
        var contents = fs.readFileSync(messageFolder+'/'+ fileName, 'utf-8');
        var rows = contents.split('\n');
  		var singleMessage = {name:fileName};
        var from = "";
        var date = "";
        var subject = "";

        var result = "";
        for (var j in rows){
            var  arr = rows[j].split(":");
            if (arr[0] === "From"){

                from = arr[1].trim();
            }
            if (arr[0] === "Date"){
                date = arr[1].trim();
            }
            if (arr[0] === "Subject"){
                subject = arr[1].trim();
            }
        };

        result = "\n" + "errorset/" + fileName + "|" + from + "|" + subject + "|" + date
        finalresult += result;
    };
    fs.writeFileSync("results.txt", finalresult);
    //console.log(messageInfo);
    return messageInfo;
})('dataset/errorset');