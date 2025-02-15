const fs = require('fs');
const { pathForRouter, fullRouterPath, enterRouter } = require('./functions');

async function readFile(filename) {

    const arr = await pathForRouter(filename);
    let arr2 = await fullRouterPath(filename, arr);

    await arr2.forEach(async r => {
        const ans = await enterRouter(r);
        r.apiRequests = ans;
    });
    return arr2;
};

module.exports = { readFile };
