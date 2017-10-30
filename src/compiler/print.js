let log = console.log.bind(console);

let print = (tokens) =>{
    for (let index of tokens.keys()) {
        log("(" + tokens[index].type + " ," + tokens[index].value +" )" );
    }
};

// module.exports = {print};
export {print};