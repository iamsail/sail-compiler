let {tokenizer } = require ('./compiler');
let {deleteComment } = require ('./deleteComment');



let start = (input) => {
    input = deleteComment(input);
    console.log("注释处理完毕  \n" + input);
    console.log("长度是 " + input.length);

    let finalResult = tokenizer(input);
    // hello
    return finalResult;
};

module.exports = {start};



