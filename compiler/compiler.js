let {print } = require ('./print');

let finalResult = {
    error: false,
    info : ""
};

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

    finalResult.error = true;
    let errorLogs = "";
    if(errorStatus === -2){
        errorLogs += `lexical analysis error,your enter is error!\nError at  ${row}:${column}`;
        finalResult.info = errorLogs;
    }

    if(errorStatus === -3){
        errorLogs += `your variableName is error!Error at  ${row}:${column}`;
        finalResult.info = errorLogs;
    }
};



let tokenizer = (input)  =>{
    finalResult.error = false;
    let current = 0; // 这个是指针
    let tokens = [];
    let errorStatus = 0;
    let rowColumn = {
        row : 1,
        column : 0
    };

    while(current < input.length && errorStatus===0 ){
        let char = input[current];

        //对列追踪的修复
        let tempCurrent = current - 1;
        if(input[tempCurrent] === '\n'){
            rowColumn.column = 1;
        }
        tempCurrent = null;


        console.log(`orz|${char}| ${rowColumn.column} `);


        // if(char === '\n' ){
        if(char === '\n'){
            console.log("加一次");
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

            log(`此时这个char是  ${char}   此时的长度是   ${current}   此时的value是   ${value}` );

            // if(char === undefined){
            if(current === input.length){
                tokens.push({ type: 'number', value:value });
                break;
            }

                // 数字过后是空白才合格
                if(WHITESPACE.test(char)){
                    // 之后我们把 number 类型的 token 储存起来,这里书上是使用的13
                    tokens.push({ type: 'number', value:value });
                }else{
                    // rowColumn.column++;
                    errorStatus = -3;logError(errorStatus,rowColumn.row,rowColumn.column);break;
                }


            // 再进行下一次循环
            continue;
        }


        //以下部分是对字符串(string)包括单引号,双引号的处理
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
            rowColumn.column++;
            char = input[++current];
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


        let firstLetter =  /(_|[a-z])/i;
        // let variableName = /[a-z]/;
        let variableName = /(_|[a-z]|[0-9])/i;


        // 以下是对标识符的处理,也就是对 用户 取的变量名的处理
        //TODO:  我需要写一个对标识符处理的正则
        //TODO:  这里我把标识符的命名规则定义为,以字母或者下划线开头,然后字母，下划线，数字的组合   记得忽略大小写
        //TODO:  /(_|[a-z])(_|[a-z]|[0-9])/i
        // let variableName = /[a-z]/i;

     if (firstLetter.test(char)) {  // 对首个字符匹配
            let value = '';
            //TODO:最后对变量名进行处理,但是不能等于undefined

         while (variableName.test(char)) {
             // if(char === '\n'){ rowColumn.row++;rowColumn.column = 1;  }
             if(char === '\n'){ rowColumn.row++;rowColumn.column = 1;break;  }


             if(char !== undefined){
                 value += char;
                 char = input[++current];
                 if(char !== undefined){
                     // if(char === '\n'){ rowColumn.row++;rowColumn.column = 1;  }
                     if(char === '\n'){ rowColumn.row++;rowColumn.column = 1;break;  }
                     let WHITESPACE = /\s/;
                     if (WHITESPACE.test(char)) {
                         //TODO:就是这一行,导致定位不准确,总算搞定了
                         // current++;
                         break;
                     }
                     let variableResult = variableName.test(char);

                     if(variableResult){
                         rowColumn.column++;
                     }else{
                         rowColumn.column ++;
                         // errorStatus = -3;log("||" + char +"||");logError(errorStatus,rowColumn.row,rowColumn.column);break;
                         errorStatus = -3;logError(errorStatus,rowColumn.row,rowColumn.column);break;
                     }
                 } else if(rowColumn.column === input.length){ //处理完字符串
                     break;
                 }else{
                     // log("column    length   " + rowColumn.column  + "   "+input.length);
                     // errorStatus = -2;log("||" + char +"||");logError(errorStatus,rowColumn.row,rowColumn.column);break;
                    break;
                 }
             }else{
                 break;}
         }

         tokens.push({ type: 'variable', value });
            rowColumn.column++;
            char = input[++current];
            continue;
        }

        else{
            switch (char){
                case '+': current = getToken(tokens,'13','+',current);continue;break;
                case '-': current = gefinalResulttToken(tokens,'14','-',current);continue;break;
                case '*': current = getToken(tokens,'15','*',current);continue;break;
                case '/': current = getToken(tokens,'16','/',current);continue;break;
                case '=': current = getToken(tokens,'17','=',current);continue;break;
                case '<': current = getToken(tokens,'18','<',current);continue;break;
                case ';': current = getToken(tokens,'19',';',current);continue;break;
                default : errorStatus = -2;log("|是它|" + char +"||");rowColumn.column--;logError(errorStatus,rowColumn.row,rowColumn.column);break;
            }
        }

        current++;
    }
    log(rowColumn.row);
    if(errorStatus === 0){
        print(tokens);
        finalResult.info = tokens;
        return finalResult;
    }else if(errorStatus === -2 || errorStatus === -3){
        return finalResult;
    }


};

// export  {tokenizer};
module.exports = {tokenizer};


