const fs = require('fs')
const path = require('path')

const { HOST, PORT } = process.env;

async function pathForRouter(filename) {

    const answer = fs.readFileSync(filename)


    const arr = answer.toString().split(';')

    let useArr = arr.filter(m =>
        (m + '').includes("app.use('/")
    )

    useArr = useArr.map(r => {
        let path = '', router = '';

        let i = 0;
        if (r.includes('swagger'))
            for (i = r.indexOf('setup(') + 6; i < r.length - 2; i++) {
                router += r[i]
            }
        else
            for (i = r.indexOf(',') + 2; i < r.length - 1; i++) {
                router += r[i]
            }
        for (i = r.indexOf("'") + 1; i < r.lastIndexOf("'"); i++) {
            path += r[i]
        }

        r = { path: path, router: router }
        return r;
    })

    return useArr;
}

async function fullRouterPath(filename, arrObjects) {
    const answer = fs.readFileSync(filename)


    const arr = answer.toString().split(';')

    const routersArr = arr.filter(m =>
        (m + '').includes("routers")
    )


    arrObjects = arrObjects.map(element => {
        let line = routersArr.filter(e => e.includes(element.router));

        element['routerPath'] = ''
        for (let i = (line[0]).indexOf("'") + 1; i < (line[0]).lastIndexOf("'"); i++) {
            element['routerPath'] += line[0][i]
        }
        return element
    });


    return arrObjects;
}

async function enterRouter(router) {
    const filepath = path.join(__dirname, `../../${router.routerPath}.js`)

    const answer = fs.readFileSync(filepath)
    let arr = answer.toString().split('router.')
    arr = arr.slice(1, arr.length)

    for (let i = 0; i < arr.length; i++) {
        let Itype = arr[i].indexOf('('), endPath = arr[i].indexOf(',')
        let obj = { type: '', pathName: '' }

        for (let j = 0; j < Itype; j++) { obj.type += arr[i][j] }
        for (let j = Itype + 2; j < endPath - 1; j++) { obj.pathName += arr[i][j] }

        obj.pathName = `http://${HOST}:${PORT}${router.path}${obj.pathName}`
        arr[i] = obj
    }
    return arr;
}

async function filterBasisArr(filename, string) {
    const answer = fs.readFileSync(filename)

    // console.log(answer.toString())

    const arr = answer.toString().split(';')

    const filterArr = arr.filter(m =>
        (m + '').includes(string)
    )
    console.log(filterArr, "filterArr");
    return filterArr;
}

module.exports = { pathForRouter, fullRouterPath, enterRouter }
