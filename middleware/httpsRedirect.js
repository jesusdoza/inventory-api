


module.exports=(req, res, next)=> {
    console.log(`redirect`)
    next()

    // if (process.env.NODE_ENV !== 'development') {
    //     if (req.headers['x-forwarded-proto'] !== 'https')
    //         // the statement for performing our redirection
    //         return res.redirect('https://' + req.headers.host + req.url);
    //     else
    //         return next();
    // } else
    //     return next();
}

