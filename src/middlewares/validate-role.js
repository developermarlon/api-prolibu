const validateRole = (valid) => {
    return function(req, res, next) {
        const permissions = req.user.permissions
        for(let i = 0; i < permissions.length; i++){
            if(valid.includes(permissions[i].name)) return next()
        }
        res.status(400).json({
            message: 'Invalid permission'
        })
    }
}

export default validateRole
