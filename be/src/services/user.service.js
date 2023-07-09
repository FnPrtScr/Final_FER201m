// @ts-ignore
const {Users}=require('../models')
const sendMail=require('../utils/send-mail')
const generateRandomNumber=require('../utils/random-code')

class UserService {
    async fncLogin(req,res){
       const {email,password}=req.body;
       const result= await Users.findOne({where:{email,password,status:1}});
       return result;
    }

    async fncRegister(req,res){
        const {email}=req.body;
        const checkEmailExists=await this.fncGetUser(req,res);
        if(checkEmailExists===null){

            const genCode=await generateRandomNumber();
            const subject="User Email Verification";
            const content=`Registered successfully.Please verify your account using this code: ${genCode}`

            await sendMail(email,subject,content);

            return await Users.create({role_id:2,status:2,codeActive:genCode,...req.body})
        }

    }

    async fncGetUser(req,res){
        const {email}=req.body;
        const result =await Users.findOne({where:{email:email}});
        return result;
    }
    async fncVerification(req,res){
        const {email,code}=req.body;
        const getCodeByUser=await this.fncGetUser(req,res);
        if(code === +getCodeByUser.codeActive){
            return await Users.update(
                { status:1},
                {
                    where: { email: email },
                }
            )
        }

    }

}

module.exports = new UserService();
