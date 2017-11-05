// import {classify}  from './classify';
import {rightCount}  from '../compiler';
let log = console.log.bind(console);

let countRightBracket = 0;

let analysisString = {
    error : false,
    info: "",
    tempArray: []
};

//记录进行语法分析的数组的当前元素下标
let tempArrayIndex = 0;

let error = () => {
    analysisString.error = true;
    analysisString.info = `${analysisString.info}出现错误,终止分析！\n`;
};

let match = (char) => {
    if(char === analysisString.tempArray[tempArrayIndex].value || char === analysisString.tempArray[tempArrayIndex].type){
        log(`${char} 匹配成功了`);
        tempArrayIndex++;
    }else if(char !== analysisString.tempArray[tempArrayIndex].value || char !== analysisString.tempArray[tempArrayIndex].type){
            log(`${char} 匹配 ${analysisString.tempArray[tempArrayIndex].value} 失败了。
            此时的下标是 ${tempArrayIndex}   `);
            analysisString.error = true;
    }
    //进行语法分析的数组的当前元素下标后移
};

let program = (tempArray) => {
    //TODO:这个tempArray应该需要过滤一下,过滤为终止符号的数组列表
    analysisString.tempArray = tempArray;

    //分类到各个表中
    // classify(tempArray);
    analysisString.info = `progarm ===> block\n`;

    block();

    log("回到了起点");
    return  analysisString;
};

let block = () => {
    if(rightCount !== 0){
        countRightBracket++;
        log(`countRightBracket  rightCount  ${countRightBracket}   ${rightCount}`);
        if(countRightBracket > rightCount){log("执行此处");   analysisString.error = true;}
    }


    if(analysisString.error){
        return;
    }

    log("================================block函数被调用了=====================");
    analysisString.info = `${analysisString.info}  block ===> {stmts}\n`;
    match("{");
    stmts();
    // log("回到原点了吗");
    match("}");
};


let stmts = () => {
  if(analysisString.error){
      return;
  }

  if(analysisString.tempArray[tempArrayIndex].type === 102){
      analysisString.info = `${analysisString.info}  stmts ===> null\n`;
      return;
  }

  analysisString.info = `${analysisString.info}  stmts ===> stmt stmts\n`;
  stmt();
  stmts();
};

let stmt = () => {
    if(analysisString.error){
        return;
    }
    //TODO: 会不会是true导致的问题
    switch (true){
        case analysisString.tempArray[tempArrayIndex].type === "variabe":
            analysisString.info = `${analysisString.info}   stmt ===> variabe = expr;\n`;
            // log("调用了这儿0===");
            match("variabe");
            match("=");
            expr();
            match(";");
            break;
        case analysisString.tempArray[tempArrayIndex].type === 3:
            match("if");
            match("(");
            bool();
            match(")");
            stmt();
            if(analysisString.tempArray[tempArrayIndex].type === 5){ //这里是 else 关键字
                analysisString.info += ` stmt ===> if(bool) stmt else stmt\n`;
                match("else");
                stmt();
                break;
            }else{
                analysisString.info += `   stmt ===> if(bool) stmt\n`;
                break;
            }
        case analysisString.tempArray[tempArrayIndex].type === 11:  //while
            analysisString.info += `   stmt ===> while(bool) stmt\n`;
            match("while");
            match("(");
            bool();
            match(")");
            stmt();
            break;
        case analysisString.tempArray[tempArrayIndex].type === 16:  //do
            analysisString.info += `   stmt ===> do stmt while(bool)\n`;
            match("do");
            stmt();
            match("while");
            match("(");
            bool();
            match(")");
            stmt();
            break;
        case analysisString.tempArray[tempArrayIndex].type === 15:  //break
            analysisString.info += `   stmt ===> break\n`;
            match("break");
            break;
        default:
            analysisString.info += `   stmt ===> block\n`;
            log("是在此处  3  调用block 函数的");
                block();
            break;
    }
};

let bool = () => {
    if(analysisString.error){
        return;
    }
    expr();

    switch (true){
        case analysisString.tempArray[tempArrayIndex].type === "55":
            analysisString.info += `   bool ===> expr < expr\n`;
            match("<");
            expr();
            break;
        case analysisString.tempArray[tempArrayIndex].type === "54":
        // case analysisString.tempArray[tempArrayIndex].type == 54:
            analysisString.info += `   bool ===> expr <= expr\n`;
            match("<=");
            expr();
            break;
        case analysisString.tempArray[tempArrayIndex].type === "57":
            analysisString.info += `   bool ===> expr > expr\n`;
            match(">");
            expr();
            break;
        case analysisString.tempArray[tempArrayIndex].type === "56":
            analysisString.info += `   bool ===> expr >= expr\n`;
            match(">=");
            expr();
            break;
        default:
            analysisString.info += `   bool ===> expr\n`;
            expr();
            break;
    }
};

let expr = () =>{
    if(analysisString.error){
        return;
    }
    analysisString.info += `   expr ===> term expr1\n`;
    term();
    expr1();
};

let expr1 = () => {
    if(analysisString.error){
        return;
    }
    switch (true){
        // case analysisString.tempArray[tempArrayIndex].type === 200:
        case analysisString.tempArray[tempArrayIndex].type === "200":
            analysisString.info += `  expr1 ===> + term expr1\n`;
            match("+");
            term();
            expr1();
            break;
        case analysisString.tempArray[tempArrayIndex].type === "201":
            analysisString.info += `  expr1 ===> - term expr1\n`;
            match("-");
            term();
            expr1();
            break;
        default:
            analysisString.info += `  expr1 ===> - null\n`;
            return;
    }
};


let term = () =>{
    if(analysisString.error){
        return;
    }
    analysisString.info += `   term ===> factor term1\n`;
    // log(`打印出来看看吧   ${analysisString.tempArray[tempArrayIndex].value}`);
    factor();
    // log(`再次打印出来看看吧   ${analysisString.tempArray[tempArrayIndex].value}`);

    term1();
};

let term1 = () =>{
    if(analysisString.error){
        return;
    }

    switch (true){
        case analysisString.tempArray[tempArrayIndex].type === "202":
            analysisString.info += `   term1 ===> * factor term1\n`;
            match("*");
            factor();
            term1();
            break;
        case analysisString.tempArray[tempArrayIndex].type === "203":
            analysisString.info += `   term1 ===> / factor term1\n`;
            match("/");
            factor();
            term1();
            break;
        default:
            analysisString.info += `  term1 ===> null\n`;
            return;
    }
};



let factor = () =>{
    if(analysisString.error){
        return;
    }
    switch (true){
        case analysisString.tempArray[tempArrayIndex].type === 100:
            analysisString.info += `   factor ===> (expr)\n`;
            match("(");
            expr();
            match(")");
            break;
        case analysisString.tempArray[tempArrayIndex].type === "variabe":
            analysisString.info += ` factor ===> variabe\n`;

            match("variabe");
            break;
        case analysisString.tempArray[tempArrayIndex].type === "number":
            analysisString.info += ` factor ===> number\n`;
            match("number");
            break;
        default:
            analysisString.error = true;
            break;
    }
};

export {program};