let getToken = (tokens,type,value,current) =>{
    tokens.push({
        type: type,
        value: value,
    });
    current++;
    return current;
};

let log = console.log.bind(console);

let logError = (errorStatus) =>{
    if(errorStatus === -2){ log("praser error,your enter is error!"); }
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
        column : 1
    };
    while(current < input.length && errorStatus===0 ){
        let char = input[current];

        if(char === '\n'){
            rowColumn.row++;
        }


        if(char === '{'){
            current = getToken(tokens,'parent','{',current);
            continue;
        }
        if(char === '}'){
            current = getToken(tokens,'parent','}',current);
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
                default : errorStatus = -2;logError(errorStatus);break;
            }
        }
        current++;
    }
    // log(rowColumn.row);
    if(errorStatus === 0){
        print(tokens);
    }
};

export  {tokenizer};


