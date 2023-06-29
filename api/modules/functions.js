const fs = require('fs')
const path = require('path')
<<<<<<< HEAD
const config = require('../../config.json')
const { HOST, PORT } = process.env;

// async function getArguments() {
//     config.obj.forEach(a => {
//         a.documnts.forEach(b => {
//             // console.log(b.functions.arguments);
//             return b.functions.arguments
//         })
//     })
// }

async function pathForRouter(filename) {

    // let useArr = await filterBasisArr(filename, "app.use('/")
    const answer = fs.readFileSync(filename)

    // console.log(answer.toString())
=======

const { HOST, PORT } = process.env;

async function pathForRouter(filename) {

    const answer = fs.readFileSync(filename)

>>>>>>> 0acb9685a52e32e53d0378b70fecf84264888e53

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
<<<<<<< HEAD
    // console.log(useArr, "element");
=======
>>>>>>> 0acb9685a52e32e53d0378b70fecf84264888e53

    return useArr;
}

async function fullRouterPath(filename, arrObjects) {
    const answer = fs.readFileSync(filename)

<<<<<<< HEAD
    // console.log(answer.toString())
=======
>>>>>>> 0acb9685a52e32e53d0378b70fecf84264888e53

    const arr = answer.toString().split(';')

    const routersArr = arr.filter(m =>
        (m + '').includes("routers")
    )

    // let routersArr = filterBasisArr(filename, "routers")

    arrObjects = arrObjects.map(element => {
        let line = routersArr.filter(e => e.includes(element.router));

        element['routerPath'] = ''
        for (let i = (line[0]).indexOf("'") + 1; i < (line[0]).lastIndexOf("'"); i++) {
            element['routerPath'] += line[0][i]
        }
        return element
    });

    // arrObjects.forEach(element => {
    //     console.log(element,"elemnt");
    // });

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
        let oldPathName = obj.pathName
        obj.pathName = `http://${HOST}:${PORT}${router.path}${obj.pathName}`
        try {
            let splitedPathName = router.routerPath.split('/').slice(2, 3)
            let allRoutersInCurrentDirectory = config.obj.filter(a => a = a).find(b => b.directory == splitedPathName).documents
            let allFunctions = allRoutersInCurrentDirectory.find(c => c.document == router.path.slice(1))
            allFunctions.functions.forEach(d => {
                if (d.key === oldPathName.slice(1).split('/')[0]) {
                    obj.arguments = d.arguments
                    obj.response = d.response
                }
            })

        }
        catch { console.log('didnt filter') }

        // obj.response=''
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
    return filterArr;
}

module.exports = { pathForRouter, fullRouterPath, enterRouter }
