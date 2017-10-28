
let deleteSingleLine = (input) =>{
    let singleComment = /(\s*\/\/.*(\n)*)+/;
    let result = input.replace(singleComment,"");
    // console.log("单行注释处理完毕  "+result);
    return result;
};

let deleteMultiLine = (input) => {
    let MultiComment = /\/\*(.*\n*)*\*\//;
    let result =  input.replace(MultiComment,"");
    // console.log("多行注释处理完毕  "+result);
    return result;
};


let deleteComment = (input) => {

    // return deleteSingleLine(input);
    return deleteMultiLine(deleteSingleLine(input));
};


module.exports = {deleteComment};