require('dotenv').config()

const getDataSynchronised = async (sql, mongo) => {
    let arr = []
    let name1=""
    mongo.forEach(m => {
        name1 = sql.find((s) => s.phone.trim() == m.phoneOrderer.trim())
        if (name1) {
            m.name = name1.name
            arr.push(m)
        }
    });
    console.log(arr,'aaarrrr');
    return arr
}

module.exports = { getDataSynchronised }
