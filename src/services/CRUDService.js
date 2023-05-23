import bcrypt from "bcryptjs";
import db from '../models'


let createNewUser = (dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(dataUser.password)
      await db.User.create({
        email: dataUser.email,
        password: hashPasswordFromBcrypt,
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        address: dataUser.address,
        phoneNumber: dataUser.phoneNumber,
        gender: dataUser.gender === '1' ? true : false,
        roleId: dataUser.roleId,
      })
      resolve('Created successfully new User!')
    } catch (error) {
      reject(error)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = bcrypt.hashSync(password, salt)
      resolve(hashPassword)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createNewUser,
}