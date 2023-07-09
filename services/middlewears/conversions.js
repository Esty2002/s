function conversionQueryToObject() {
    return (req, res, next) => {
        const { query } = req
        // console.log({ query })
        let obj = {}
        let pointer = [obj];
        let i = 0;
        const convert = async (key, value) => {
            if (key.includes('start')) {
                pointer[i][value] = []
                if (i == pointer.length - 1)
                    pointer.push(pointer[i][value])
                else
                    pointer[i + 1] = pointer[i][value]
                i++;
                return;
            }
            if (key.includes('end')) {
                i--;
                return;
            }
            else {
                let object = {}
                object[removeIndexes(key)] = value
                pointer[i].push(object)
                return;
            }
        }
        for (const key in query) {
            convert(key, query[key]);
        }
        req.query = obj
        next()
    }
}
function removeIndexes(str){
    let s = '';
    for (let i = 0; i < str.length; i++) {
        if(str[i] >= '0' && str[i] <= '9')
            return s;
        s += str[i]
    }
    return s;
}
module.exports = { conversionQueryToObject }

