import { resolveInclude } from 'ejs'
import userService from '../service/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            code: 1,
            message: 'Missing email or password, please fill in',
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        code: userData.code,
        message: userData.message,
        user: userData.user ? userData.user : userData

    })

}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing parameter',
            Users: []
        })
    }
    let Users = await userService.getAllUser(id)
    return res.status(200).json({
        code: 0,
        message: 'OK',
        Users
    })
}

let handleCreateUser = async (req, res) => {
//    let email = req.body.email
//    let password = req.body.password
//    if(!email ||!password){
//        return res.status(200).json({
//            code: 1,
//            message: 'Missing email or password'
//        })
//    }
   let message = await userService.createUser(req.body)
   return res.status(200).json(message)

}

let handleEditUser = async (req,res) => {
    let data = req.body
    if(!data.id){
        return res.status(200).json({
            code: 2,
            message: 'Missing parameter'
        })
    }
    let message = await userService.updateUser(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req,res) => {
    if(!req.body.id){
        return res.status(200).json({
            code: 2,
            message: 'Missing parameter'
        })
    }
    let message = await userService.deleteUser(req.body.id)

    return res.status(200).json(message)
}
let getAllCode = async(req, res) => {
   try {
       let data = await userService.getAllCodeService(req.query.type)
       return res.status(200).json(data)
   } catch (error) {
       console.log('Get allcode error: ', error);
       return res.status(200).json({
           code: -1,
           message: 'Error from server'
       })
   }
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode
}