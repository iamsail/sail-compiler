let log = console.log.bind(console);

let MAX = 20;
let table = [
    [5,-1,-1,4,-1,-1,1,2,3],
    [-1,6,-1,-1,-1,12,-1,-1,-1],
    [-1,22,7,-1,22,22,-1,-1,-1],
    [-1,24,24,-1,24,24,-1,-1,-1],
    [5,-1,-1,4,-1,-1,8,2,3],
    [-1,26,26,-1,26,26,-1,-1,-1],
    [5,-1,-1,4,-1,-1,-1,9,3],
    [5,-1,-1,4,-1,-1,-1,-1,10],
    [-1,6,-1,-1,11,-1,-1,-1,-1],
    [-1,21,7,-1,21,21,-1,-1,-1],
    [-1,23,23,-1,23,23,-1,-1,-1],
    [-1,25,25,-1,25,25,-1,-1,-1]
];

function Rule(a,b) {
    this.x = a;
    this.y = b;
}

let rule = [];

rule[0] = new Rule('E',3);
rule[1] = new Rule('E',1);
rule[2] = new Rule('T',3);
rule[3] = new Rule('T',1);
rule[4] = new Rule('F',3);
rule[5] = new Rule('F',1);

let indexChar = ['i','+','*',',','(',')','#','E','T','F'];

let getIndexChar = (x) =>{
    for(let j = 0; j < 9; j++){
        if(indexChar[j] === x){
            return j;
        }
    }
    return -1;
};

//记录一下输出字符串
let outputStr ='';

//TODO:鉴于JS没有函数签名,我用 _ 来区分状态部分和符号部分的功能相同的函数

// `======================状态部分

function Status() {
    this.stack = [];
    this.top   = null;
}

let initStatus = (statusP) => {
    statusP.top = -1;
};

let push = (statusP,x) =>{
    if(statusP.top < MAX -1){
        statusP.top++;
        statusP.stack[statusP.top] = x;
    }else{
        log("初始化状态栈错误");
    }
};

let pop = (statusP) =>{
    let x;
    if(statusP.top !== 0){
        x = statusP.stack[statusP.top];
        statusP.top--;
        return x;
    }else{
        log(`状态栈1空`);
        return 0;
    }
};

let getTop = (statusP) =>{
    if(statusP.top !== -1){
        return statusP.stack[statusP.top];
    }else {
        log("状态栈2空");
        return 0;
    }
};

let outStack = (statusP) =>{
    if(statusP.top < 0){
        log("状态栈3为空");
    }
    for(let i = 0; i <= statusP.top; i++){
        // log(statusP.stack[i]);
        outputStr += `${statusP.stack[i]}`;
    }
};

// $======================状态部分



// `======================符号部分

function SymbolInStr() {
    this.stack = [];
    this.top   = null;
}

let initSymbolInStr = (tempObject) => {
    tempObject.top = -1;
};

let _push = (tempObject,x) =>{
    if(tempObject.top < MAX -1){
        tempObject.top++;
        tempObject.stack[tempObject.top] = x;
    }else{
        log("初始化符号栈错误");
    }
};

let _pop = (tempObject) => {
    let x;
    if(tempObject.top !== -1){
        x = tempObject.stack[tempObject.top];
        tempObject.top--;
        return x;
    }else{
        log(`符号栈1空`);
        return 0;
    }
};

let _getTop = (tempObject) =>{
    log(tempObject);
    if(tempObject.top !== -1){
        return tempObject.stack[tempObject.top];
    }
    else{
        log("符号栈2空");
        return 0;
    }
};



// let _getTop = (symbolP) =>{
//     if(symbolP.top !== -1){
//         return symbolP.stack[symbolP.top];
//     }
//     else{
//         log("符号栈2空");
//         return 0;
//     }
// };

let _outStackOne = (symbolP) =>{
    if(symbolP.top < 0){
        log("符号栈3为空");
    }
    for(let i = 0; i <= symbolP.top; i++){
        // log(symbolP.stack[i]);
        outputStr += `${symbolP.stack[i]}`;
    }
};

let _outStackTow = (instrP) =>{
    if(instrP.top < 0){
        log("符号栈4为空");
    }
    for(let i = 0; i <= instrP.top; i++){
        // log(instrP.stack[i]);
        outputStr += `${instrP.stack[i]}`;
    }
};

// $======================符号部分

let print = (statusP,symbolP,instrP) =>{
    let i;
    outStack(statusP);
    for(i = 0; i < 20 - statusP.top;i++){
        outputStr += ` `;
    }
    _outStackOne(symbolP);
    for(i = 0; i < 20;i++){
        outputStr += ` `;
    }
    _outStackTow(instrP);
    //打印每行的结果
    log(outputStr);
    log(`\n`);
};

let gotoChar = (statusP,instrP) =>{
    let x,y,z;

    x = _getTop(instrP);
    y = getTop(statusP);
    z = getIndexChar(x);
    return table[y][z];
};

let action = (statusP,symbolP,instrP) =>{
    let i;
    i = gotoChar(statusP,instrP);

    if(i === -1){
        log(`归约错误`);
    }

    if(i === 12){
        log(`归约成功`);
    }

    if(i >= 0 && i <= 11){
        let a;
        push(statusP,i);
        a = _pop(instrP);
        _push(symbolP,a);
        print(statusP,symbolP,instrP);
        action(statusP,symbolP,instrP);
    }

    if(i >= 21 && i <= 26){
        let temp;
        temp = rule[i-21].y;
        for(let j = 0;j < temp;j++){
            pop(statusP);
            _pop(symbolP);
        }
        _push(instrP,rule[i-21].x);
        action(statusP,symbolP,instrP);
    }
};

let start = () =>{
    let x;
    let statusP = new Status();
    let symbolP = new SymbolInStr();
    let instrP  = new SymbolInStr();
    initStatus(statusP);
    initSymbolInStr(symbolP);
    initSymbolInStr(instrP);
    push(statusP,0);
    _push(symbolP,'#');

    //此处是进行处理的输入串,先我自己模拟
    let mockString = 'i*i+i#';
    //反转字符串
    for(let i = 0; i < mockString.length; i++){
        _push(instrP,mockString[i]);
    }
    // log(instrP);
    log(`状态栈               符号栈               输入串`);
    print(statusP,symbolP,instrP);
    action(statusP,symbolP,instrP);
};

start();