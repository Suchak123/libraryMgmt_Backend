const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../../models/userModel');
const booksModel = require('../../models/booksModel');

const signupUser = async (req, res) => {
    try{
        const userData = new userModel(req.body);

        const userExistEmail = await userModel.findOne({
            userEmail : req.body.userEmail
        })

        if(!userExistEmail){
            const bcryptPassword = await bcrypt.hash(req.body.userPassword, 10)
            userData.userPassword = bcryptPassword
            userData.userProfilePic ="C:/Users/asus/Desktop/proposal/code/uploads/avatar/avatar1"

            await userData.save()
            res.status(200).send({
                success: true,
                message: "User created successfully"
            })

        } else{
            res.status(400).send({
                success: false,
                message: "User email or phone is already in use!",
            })
        }
    }catch(error) {
        res.status(500).send({
            success: false,
            message: "Error occured",
            error: error.message 
        })
    }
} 

const loginUser = async (req, res) => {
    try{
        const { userEmail, userPassword } = req.body
        const userData = await userModel.findOne({
            userEmail: userEmail
        })
        const passwordCheck = await bcrypt.compare(userPassword, userData.userPassword)
        if(passwordCheck){
            const token = await jwt.sign({ userData }, process.env.SECRET_KEY, { expiresIn : '1h'})
            return res.status(200).send({
                success: true,
                message: "User login successful!",
                token: token,
            })
        }
        res.status(401).send({
            success: false,
            message: "User password or email is incorrect!"
        })
    } catch(error){
        res.status(500).send({
            success: false,
            message: "error occured",
            error: error.message
        })
    }
}

// const viewProfile = async (req, res) => {
//     try{
//         const { userId } = req.params

        
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "Error occured",
//             error: error.message
//         })
//     }   
// }

const userDashboard = async (req,res) => {
    try{
        const topBooks = await booksModel.find({})
        .limit(5)
        res.status(200).send({
            success: true,
            message: "Books found",
            books: topBooks
        })
    } catch(error){
        res.status(500).send({
            success: false,
            message: "Error occured",
            error: error.message
        })
    } 
}

module.exports = {
    signupUser, loginUser, userDashboard
}