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

        // 移动后我们将检查空格及空白字符串，若匹配到则不作任何处理，光标继续后移
        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        // 之后的 token 类型是 number 。这和我们刚刚处理的不同，因为我们需要截取一个整个 number
        // 来作为 token
        //
        //   (add 123 456)
        //        ^^^ ^^^
        //        Only two separate tokens
        //
        // 所以我们重新创建一个循环，当遇到第一个 number 是婚后
        //TODO :1. 这里需要特别注意一下，对于数字的处理,这里没有考虑开始字母为0的情况
        //TODO：2. 对数字,字母处理的时候,需要注意讲错误追踪的列下标,紧跟着移动
        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {

            // 我们创建一个 value 字符串来储存字符
            let value = '';
            //这里我下减是因为在最初我对整体的错误追踪加了1
            rowColumn.column--;
            // 之后我们创建一个循环来把连续的 number 储存在 value 中并增加 current 的值
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
                rowColumn.column++;
            }

            // 之后我们把 number 类型的 token 储存起来,这里书上是使用的13
            tokens.push({ type: 'number', value:value });

            // 再进行下一次循环
            continue;
        }


        if(char === '"'){
            let value = '';
            rowColumn.column--;
            char = input[++current];
            while(char !== '"'){
                value += char;
                char = input[++current];
                rowColumn.column++;
            }
            tokens.push({ type: 'string', value:value });
            continue;
        }


        if(char === "'"){
            let value = '';
            char = input[++current];
            while(char !== "'"){
                value += char;
                char = input[++current];
                rowColumn.column++;
            }
            tokens.push({ type: 'string', value:value });
            rowColumn.column++;
            char = input[++current];
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


