import db from '../models/index'
import bcrypt from 'bcryptjs'
import { response } from 'express'

var salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}

let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        let userData = {}

        try {
            let isEmailExist = await checkEmail(email)
            if (isEmailExist) {
                //checkpassword
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.code = 0

                        delete user.password
                        userData.user = user
                    } else {
                        userData.code = 3
                        userData.message = "Wrong password"
                    }
                } else {
                    userData.code = 2
                    userData.message = 'Your email does not exist 2'
                }
            } else {
                userData.code = 2
                userData.message = 'Your email does not exist 1'
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = await db.User.findOne({
                where: { email: userEmail }
            })
            if (userData) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = null
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }

                })
            }
            if (userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }


    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email)
            if (check === true) {
                resolve({
                    code: 1,
                    message: 'Your email already existed'
                })
            } else {
                let hashPassWordFromBcrypt = await hashPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender ,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })

                resolve({
                    code: 0,
                    message: 'Successful'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id || !data.roleId || !data.positionId || !data.gender){
                resolve({
                    code: 2,
                    message: 'Missing parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.gender = data.gender
                user.roleId = data.roleId
                user.positionId = data.positionId
                user.phoneNumber = data.phoneNumber
                if(data.avatar){
                   user.image = data.avatar
                }
                
                await user.save()

                resolve({
                    code: 0,
                    message: 'Update successful'
                })
            }

            resolve({
                code: 1,
                message: `User doesn't exist`
            })


        } catch (error) {
            reject(error)
        }

    })
}

let deleteUser = (uid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: uid }
            })

            if (!user) {
                resolve({
                    code: 1,
                    message: `User doesn't exist `
                })
            }

            await db.User.destroy({
                where: { id: uid }
            })

            resolve({
                code: 0,
                message: 'Delete successful'
            })

        } catch (error) {
            reject(error)
        }
    })
}
let getAllCodeService = (typeInput) =>{
   return new Promise(async(resolve, reject) => {
     try {
         if(!typeInput){
             resolve({
                 code: -2,
                 message: 'Missing param'
             })
         }else{
             let res = {}
             let allcode = await db.Allcode.findAll({
                 where: {type: typeInput}
             })
             res.code = 0
             res.data = allcode
             resolve(res)
         }
     } catch (error) {
         reject(error)
     }
   })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService
}