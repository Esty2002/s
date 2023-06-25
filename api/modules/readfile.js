const fs = require('fs')


async function readFile (filename){
    const answer = fs.readFileSync(filename)
    // console.log(answer.toString())
    return answer.toString();
}



module.exports = { readFile }   
 