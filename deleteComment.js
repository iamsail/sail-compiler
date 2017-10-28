let deleteComment = (input) =>{
    //TODO:先去除单行注释
    // let singleComment = /^\s*\/\/.*\n$/;
    // let singleComment = /(^\s*\/\/.*\n$)+/;
    console.log("去除前   \n" + input);
    let singleComment = /(\s*\/\/.*(\n)*)+/;
    let result = singleComment.test(input);
    console.log("匹配结果   " + result);
    return input.replace(singleComment,"");
};





module.exports = {deleteComment};