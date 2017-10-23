// import {tokenizer} from './main'
let {tokenizer } = require ('./main');

// let input = "abcd @b";
// let input = "abcd @b 123 \n  6666 ";
let input = "abcd b 123 \n  66@66 ";
console.log(input);
tokenizer(input);