module.exports = func => {
    return(rq, res, next) => {
        func(req, res, next).catch(next)
    }
}