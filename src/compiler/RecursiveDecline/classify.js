let classifyResult = {
    keywordTable : [],
    digitTable: [],
    identifierTable: [],
    otherCharTable: [],
    finalTable: []
};

/*
    keywordTable   2--48
    digitTable     number
    IdentifierTable   variable
    otherCharTable  >500
    finalTable     450-480
 */


let print = () => {
    console.log(`keywordTable列表打印如下\n`);
    classifyResult.keywordTable.forEach(function (item) {
        console.log(item);
    });
    console.log(`\ndigitTable列表打印如下\n`);
    classifyResult.digitTable.forEach(function (item) {
        console.log(item);
    });
    console.log(`\nidentifierTable列表打印如下\n`);
    classifyResult.identifierTable.forEach(function (item) {
        console.log(item);
    });
    console.log(`\notherCharTable列表打印如下\n`);
    classifyResult.otherCharTable.forEach(function (item) {
        console.log(item);
    });
    console.log(`\nfinalTable列表打印如下\n`);
    classifyResult.finalTable.forEach(function (item) {
        console.log(item);
    });
};

let classify = (tempArray) =>{
    tempArray.forEach(function(item){
        // console.log(`${item.type}   ${item.value}`);
        switch (true){
            case item.type > 2 && item.type < 48:
                classifyResult.keywordTable.push(item.value);
                break;
            case  item.type === "number":
                classifyResult.digitTable.push(item.value);
                break;
            case  item.type === "variabe":
                classifyResult.identifierTable.push(item.value);
                break;
            // case  item.type > 500:
            //     classifyResult.otherCharTable.push(item.value);
            //     break;
            default:
                classifyResult.otherCharTable.push(item.value);
                classifyResult.finalTable.push(item.value);
                break;
        }
    });
    // print();
};


export {classify};