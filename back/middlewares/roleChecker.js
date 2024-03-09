function checkRole(roles) {
    return function(req, res, next) {
        const userRole = req.user.type;
        if (userRole !== undefined && roles.includes(userRole)) {
            
            next(); 
        } else {
            res.status(403).send("Unauthorized"); 
        }
    };
}

export default checkRole;
  
