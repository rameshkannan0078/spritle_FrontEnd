const { FindUserExist } = require("../userFunctions");

export const passwordValidation=(password1,password2)=>{
    return JSON.stringify(password1) === JSON.stringify(password2);
 }

export const  checkUserExist= async (email)=> {
    try {
        const result = await FindUserExist(email);
        console.log(`Result from FindUserExist: ${result}`);
        return result === 0 ? 0 : 1;
    } catch (err) {
        console.log(err);
    }
  }