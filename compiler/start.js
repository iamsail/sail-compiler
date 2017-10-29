// import {tokenizer} from './main'
let {tokenizer } = require ('./compiler');
let {deleteComment } = require ('./deleteComment');



let start = (input) => {
    input = deleteComment(input);
    console.log("注释处理完毕  " + input);
    // tokenizer(input);
    let finalResult = tokenizer(input);
    return finalResult;
}

module.exports = {start};