function conversionQueryToObject() {
    return (req, res, next) => {
        const { query } = req
        console.log({ query })
        let obj = {}
        let pointer = [obj];
        let i = 0;

        const convert = async (key, value) => {

            if (key.includes('start')) {
                pointer[i][value] = []
                pointer.push(pointer[i][value])
                i++;
                return;
            }
            if (key.includes('end')) {
                i--;
                return;
            }
            else {
                let object = {}
                object[key] = value
                pointer[i].push(object)
                return;
            }

        }

        for (const key in query) {
            convert(key, query[key]);
        }

        console.log(obj, "\n----------------------------------obj");
        next()
    }
}

module.exports = { conversionQueryToObject }

