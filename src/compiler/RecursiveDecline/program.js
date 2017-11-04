import {classify}  from './classify';

let analysisString = {
    error : false,
    info: "",
    tempArray: []
};

//记录进行语法分析的数组的当前元素下标
let tempArrayIndex = 0;

let log = console.log.bind(console);

let error = () => {
    analysisString.error = true;
    analysisString.info = `${analysisString.info}出现错误,终止分析！\n`;
};


let match = (char) => {
    if(char === analysisString.tempArray[tempArrayIndex].value){log(`${char} 匹配了`);}
    else{
        analysisString.error = true;
    }
    tempArrayIndex++;
};


let program = (tempArray) => {
    analysisString.tempArray = tempArray;
    analysisString.tempArray.forEach(function(item){
        log(`(${item.type},${item.value})=============\n`);
    });

    //分类到各个表中
    classify(tempArray);
    analysisString.info = `progarm ===> block\n`;
    block();
    return  analysisString;
};

let block = () => {
    analysisString.info = `${analysisString.info}  block ===> {stmts}\n`;
    match("{");
    stmts();
};


let stmts = () => {
  if(analysisString.error){
      return;
  }
  if(analysisString.tempArray[tempArrayIndex].value === 102){
      analysisString.info = `${analysisString.info}  stmts ===> null\n`;
      return;
  }
  analysisString.info = `${analysisString.info}  stmts ===> stmt stmts\n`;
};

export {program};