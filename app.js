// import {tokenizer} from './main'
let {tokenizer } = require ('./main');
let {deleteComment } = require ('./deleteComment');



// let input = "//ab123@c\n" +
//     "//ab123@c\n" +
//     "hello world 1243\n" +
//     "/* fefe\n" +
//     "312fdabcd\n" +
//     "*/\n" +
//     "/* fefe\n" +
//     "312fdabcd\n" +
//     "*/\n" +
//     "/* fefe\n" +
//     "312fdabcd\n" +
//     "*/\n" +
//     "include iostream";

// TODO:最后以字母结尾会报错
let input = "hello world";

// let input = "//ab123@c\n" +
//     "//ab123@c\n" +
//     "hello world 1243\n" +
//     "/* fefe\n" +
//     "312fdabcd\n" +
//     "*/\n" +
//     "/* fefe\n" +
//     "312fdabcd\n" +
//     "*/\n" +
//     "/* fefe\n" +
//     "312fdabcd\n" +
//     "*/\n" +
//     "include iostream\n";


input = deleteComment(input);

console.log("注释处理完毕  " + input);

tokenizer(input);