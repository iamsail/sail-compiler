import {classify}  from './classify';

let analysisString = {
    error : false,
    info: ""
};

let program = (tempArray) => {
    analysisString.info = `progarm ===> block\n`;
    classify(tempArray);
    return  analysisString;
};

export {program};