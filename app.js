// import {tokenizer} from './main'
let {tokenizer } = require ('./main');
let {deleteComment } = require ('./deleteComment');

let input = "//ab456@c\n" +
    "//ab123@c \n hello world 1243";


input = deleteComment(input);
console.log("去除注释后  |"+ input +"|");
tokenizer(input);