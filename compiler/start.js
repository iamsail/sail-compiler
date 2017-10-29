// import {tokenizer} from './main'
let {tokenizer } = require ('./compiler');
let {deleteComment } = require ('./deleteComment');


let input = "//ab123@c\n" +
    "//ab123@c\n" +
    "hello world 1243\n" +
    "/* fefe\n" +
    "312fdabcd\n" +
    "*/\n" +
    "include iostream";



input = deleteComment(input);

console.log("注释处理完毕  " + input);

tokenizer(input);