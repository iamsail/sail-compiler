// import {tokenizer} from './main'
let {tokenizer } = require ('./main');

// let input = "abcd @b";
let input = "abcd @b 123 \n";
console.log(input);
tokenizer(input);