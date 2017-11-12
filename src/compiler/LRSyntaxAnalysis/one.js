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

let getIndexChar = () =>{

};

//TODO:鉴于JS没有函数签名,我用 _ 来区分状态部分和符号部分的功能相同的函数

// ======================状态部分

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

// ======================状态部分

// ======================符号部分

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

// ======================符号部分



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
    // log(statusP);
    // log(symbolP);

    //此处是进行处理的输入串,先我自己模拟
    let mockString = 'i*i+i#';

};

start();