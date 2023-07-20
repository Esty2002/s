

function reqLogger(){
    return (req, res, next)=>{
        const {hostname,port,baseUrl, url, body} = req
        // console.log({hostname,port,baseUrl,url, body})
        next()
    }
}

module.exports={reqLogger}