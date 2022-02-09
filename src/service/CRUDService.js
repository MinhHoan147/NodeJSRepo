import bcrypt from 'bcryptjs'
import db from '../models/index'

var salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassWordFromBcrypt = await hashPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPassWordFromBcrypt,
        firstName: data.FirstName,
        lastName: data.LastName,
        address: data.Address,
        phoneNumber: data.PhoneNumber,
        gender: data.Gender === '0' ? true : false,
        roleId: data.Role,
      })
      resolve("Create user successful from Service")
    } catch (error) {
      reject(error)
    }
  })
}

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

let displayUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true
      })
      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

let getUserById = async (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userById = await db.User.findOne({
        where: { id: uid },
        raw: true

      })
      if (userById) {
        resolve(userById)
      } else {
        resolve({})
      }

    } catch (error) {
      reject(error)
    }

  })
}

let updateUserData = (data) => {
   return new Promise(async (resolve,reject) => {
    try {
      let user = await db.User.findOne({
        where: {id: data.id}
      })
      if(user){
        user.firstName = data.FirstName
        user.lastName = data.LastName
        user.address = data.Address

         await user.save()
         let allusers = await db.User.findAll()
         resolve(allusers)

      }else{
         resolve({})
      }
    } catch (error) {
      reject(error)
    }  
    
  })
}

let deleteUserById = (uid) => {
     return new Promise(async (resolve,reject) => {
       try {
          let user = await db.User.findOne({
            where: {id: uid}
          })
          if(user){
            await user.destroy()
          }
          resolve()
       } catch (error) {
         reject(error)
       }
   })
}

module.exports = {
  createUser: createUser,
  displayUser: displayUser,
  getUserById: getUserById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById
}