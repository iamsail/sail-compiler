// let {tokenizer } = require ('./compiler');
// let {deleteComment } = require ('./deleteComment');

import {tokenizer}  from './compiler';
import {deleteComment}  from './deleteComment';

let start = (input) => {
    input = deleteComment(input);
    // console.log("注释处理完毕  \n" + input);
    // console.log("长度是 " + input.length);

    let finalResult = tokenizer(input);

    console.log("那我就打印一下咯\n");
    finalResult.info.forEach(function(item){
        console.log(`(${item.type},${item.value})\n`);
    });

    return finalResult;
};

// module.exports = {start};
export {start};



