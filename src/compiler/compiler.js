// let {print } = require ('./print');
import {print}  from './print';

let finalResult = {
    error: false,
    info : "",
};


let rightCount = 0;

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

let keywordsList = (value) =>{
    let type;
    switch (value) {
        case 'if':      type = 3;break;
        case 'then':    type = 4;break;
        case 'else':    type = 5;break;
        case 'end':     type = 6;break;
        case 'repeat':  type = 7;break;
        case 'until':   type = 8;break;
        case 'read':    type = 9;break;
        case 'write':   type = 10;break;
        case 'while':   type = 11;break;
        case 'for':     type = 12;break;
        case 'float':   type = 13;break;
        case 'int':     type = 14;break;
        case 'break':   type = 15;break;
        case 'do':      type = 16;break;
        default:        type = 'variabe';break;
    }
    return  type;
};

let tokenizer = (input)  =>{
    let rightBracket = 0;

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
        // console.log(`orz|${char}| ${rowColumn.column} `);

        // if(char === '\n' ){
        if(char === '\n'){
            console.log("加一次");
            rowColumn.row++;
            rowColumn.column = 0;
        }else{
            rowColumn.column++;
        }

        if(char === '{'){
            current = getToken(tokens,'102','{',current);
            rightBracket++;
            log("我增加了   1          =============");
            continue;
        }
        if(char === '}'){
            current = getToken(tokens,'103','}',current);
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

            // log(`此时这个char是  ${char}   此时的长度是   ${current}   此时的value是   ${value}` );

            // if(char === undefined){
            if(current === input.length){
                tokens.push({ type: 'number', value:value });
                break;
            }

                // // 数字过后是空白才合格
                // if(WHITESPACE.test(char)){
                //     // 之后我们把 number 类型的 token 储存起来,这里书上是使用的13
                //     tokens.push({ type: 'number', value:value });
                // }else{
                //     // rowColumn.column++;
                //     errorStatus = -3;logError(errorStatus,rowColumn.row,rowColumn.column);break;
                // }

            // let NUMBER = /[0-9]|;/;
            let NumberEnd = /\s|;|}|{|\)|\(|=|!/;

            let result1 = WHITESPACE.test(char);
            // 数字过后是空白才合格
            if(NumberEnd.test(char)){
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
             if(char === '\n'){ rowColumn.row++;rowColumn.column = 1;break;  }

             if(char !== undefined){
                 value += char;
                 char = input[++current];

                 if(char !== undefined){
                     if(char === '\n'){ rowColumn.row++;rowColumn.column = 1;break;  }
                     let WHITESPACE = /\s/;
                     if (WHITESPACE.test(char)) {
                         //TODO:就是这一行,导致定位不准确,总算搞定了
                         // current++;
                         break;
                     }

                     let variableName = /(_|[a-z]|[0-9])/i;
                     let variableNameMore = /({|}|\(|\)|;|,)/i;
                     let variableResult = variableNameMore.test(char);


                     // if(variableResult){
                     //     // rowColumn.column++;
                     // }else{
                     //     // rowColumn.column ++;
                     //     // errorStatus = -3;
                     //     // logError(errorStatus,rowColumn.row,rowColumn.column);
                     //     break;
                     // }

                    // if(!Result){break;}

                    if(variableResult){
                           current--;
                           break;
                    }

                 } else if(rowColumn.column === input.length){ //处理完字符串
                     break;
                 }else{
                    break;
                 }
             }else{
                 break;}
         }


         tokens.push({ type: keywordsList(value), value });
            rowColumn.column++;
            char = input[++current];
            continue;
        }


        if(char === "<"){
            let value = char;
            let nextChar = input[++current];
            if(nextChar === "="){
                value = `${value}=`;
                current = getToken(tokens,'54',value,current);  // <=
            }else{
                current--;
                current = getToken(tokens,'55',value,current);  // <
            }
            continue;
        }


        if(char === ">"){
            let value = char;
            let nextChar = input[++current];
            if(nextChar === "="){
                value = `${value}=`;
                current = getToken(tokens,'56',value,current); // >=
            }else{
                current--;
                current = getToken(tokens,'57',value,current); // >
            }
            continue;
        }

        else{
            switch (char){
                case '+': current = getToken(tokens,'200','+',current);continue;break;
                case '-': current = getToken(tokens,'201','-',current);continue;break;
                case '*': current = getToken(tokens,'202','*',current);continue;break;
                case '/': current = getToken(tokens,'203','/',current);continue;break;
                case '=': current = getToken(tokens,'204','=',current);continue;break;
                case ';': current = getToken(tokens,'205',';',current);continue;break;
                case '(': current = getToken(tokens,'100','(',current);continue;break;
                case ')': current = getToken(tokens,'101',')',current);continue;break;
                case '#': current = getToken(tokens,'300','#',current);continue;break;
                default : errorStatus = -2;log("|是它|" + char +"||");rowColumn.column--;logError(errorStatus,rowColumn.row,rowColumn.column);break;
            }
        }

        current++;
    }
    // log(rowColumn.row);
    log("   ===============代码行数===============     "  + rowColumn.row);
    if(errorStatus === 0){
        // print(tokens);
        finalResult.info = tokens;
        rightCount = rightBracket;
        return finalResult;
    }else if(errorStatus === -2 || errorStatus === -3){
        return finalResult;
    }


};

export  {tokenizer,rightCount};
// module.exports = {tokenizer};


