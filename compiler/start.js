// import {tokenizer} from './main'
let {tokenizer } = require ('./compiler');
let {deleteComment } = require ('./deleteComment');



let start = (input) => {
    // input = deleteComment(input);
    // console.log("注释处理完毕  " + input);
    // tokenizer(input);
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
// let input ="hello \n" +
//     "world\n" +
//     "123\n" +
//     "456";
//
//     input = deleteComment(input);
//     console.log("注释处理完毕  " + input);
//     // tokenizer(input);
//     let finalResult = tokenizer(input);
//     return finalResult;

