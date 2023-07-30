const bcrypt=require('bcryptjs')

function hashMyPassword(password){
    const salt=bcrypt.genSaltSync()
    return bcrypt.hashSync(password,salt)
}

function compareHash(raw,hash){
    return bcrypt.compareSync(raw,hash)
}

module.exports={
    hashMyPassword,
    compareHash,
}