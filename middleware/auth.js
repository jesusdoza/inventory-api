module.exports= {
    ensureAuth:function(req,res,next){
        if(req.isAuthenticated()){//if authenticated is truthy next()
            console.log(`authenticated?`,req.isAuthenticated())
            return next();
        }else{//else send to login at root
            console.log(`authenticated?`,req.isAuthenticated())
            res.redirect('/');
        }

    },
    ensureGuest: function(req,res,next){
        if(req.isAuthenticated()){ // already authenticated send to dashboard
            console.log(`authenticated?`,req.isAuthenticated())
            res.redirect('/dashboard');
        }else{//else go to next
            console.log(`authenticated?`,req.isAuthenticated())
            return next();
        }
    }
}