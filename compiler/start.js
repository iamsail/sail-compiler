// import {tokenizer} from './main'
let {tokenizer } = require ('./compiler');
let {deleteComment } = require ('./deleteComment');



let start = (input) => {
    input = deleteComment(input);
    console.log("注释处理完毕  " + input);
    let finalResult = tokenizer(input);
    return finalResult;
}

module.exports = {start};




// hello
// world
// 123
// 456





// let {tokenizer } = require ('./compiler');
// let {deleteComment } = require ('./deleteComment');
//
// let input="include iostream\n" +
//     "fwe\n" +
//     "//fefe";
//
//     input = deleteComment(input);
//     console.log("注释处理完毕  " + input);
//     // tokenizer(input);
//     let finalResult = tokenizer(input);
//     return finalResult;

