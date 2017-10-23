let getToken = (tokens,type,value,current) =>{
    tokens.push({
        type: type,
        value: value,
    });
    current++;
    return current;
};

let log = console.log.bind(console);

let logError = (errorStatus,row,column) =>{
    if(errorStatus === -2){
        log("lexical analysis error,your enter is error!");
        log("Error at  " + row + ":" + column);
    }
};

let print = (tokens) =>{
    for (let index of tokens.keys()) {
        log("(" + tokens[index].type + " ," + tokens[index].value +" )" );
    }
};

let tokenizer = (input)  =>{
    let current = 0;
    let tokens = [];
    let errorStatus = 0;
    let rowColumn = {
        row : 1,
        column : 0
    };
    while(current < input.length && errorStatus===0 ){
        let char = input[current];

        if(char === '\n'){
            rowColumn.row++;
            rowColumn.column = 0;
        }else{
            rowColumn.column++;
        }

        if(char === '{'){
            current = getToken(tokens,'parent','{',current);
            continue;
        }
        if(char === '}'){
            current = getToken(tokens,'parent','}',current);
            continue;
        }

        // ???????????????????????????????????
        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        // ??? token ??? number ????????????????????????? number
        // ??? token
        //
        //   (add 123 456)
        //        ^^^ ^^^
        //        Only two separate tokens
        //
        // ??????????????????? number ???
        //TODO:1. ??????????????????,???????????0???
        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {

            // ?????? value ????????
            let value = '';

            // ??????????????? number ??? value ???? current ??
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            // ????? number ??? token ????,????????13
            tokens.push({ type: 'number', value:value });

            // ????????
            continue;
        }



        else{
            switch (char){
                case '+': current = getToken(tokens,'13','+',current);continue;break;
                case '-': current = getToken(tokens,'14','-',current);continue;break;
                case '*': current = getToken(tokens,'15','*',current);continue;break;
                case '/': current = getToken(tokens,'16','/',current);continue;break;
                case '=': current = getToken(tokens,'17','=',current);continue;break;
                case '<': current = getToken(tokens,'18','<',current);continue;break;
                case ';': current = getToken(tokens,'19',';',current);continue;break;
                default : errorStatus = -2;log("||" + char +"||");logError(errorStatus,rowColumn.row,rowColumn.column);break;
            }
        }
        current++;
    }
    log(rowColumn.row);
    if(errorStatus === 0){
        print(tokens);
    }
};

export  {tokenizer};


