let getToken = (tokens,type,value,current) =>{
    tokens.push({
        type: type,
        value: value,
    });
    current++;
    return current;
};



let tokenizer = (input)  =>{
    let current = 0;
    let tokens = [];
    let errorStatus = 0;
    while(current < input.length && errorStatus===0 ){
        let char = input[current];

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
    if(errorStatus === 0){
        console.log(tokens);
    }
};


let log = console.log.bind(console);

let logError = (errorStatus) =>{
    if(errorStatus === -2){ log("praser error,your enter is error!"); }
};

export  {tokenizer};
