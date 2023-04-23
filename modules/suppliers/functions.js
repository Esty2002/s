const setDate = (stringOfDate) => {
    return new Date(stringOfDate).toISOString().split("T").join(" ").split("Z")[0];
}

module.exports = { setDate };
