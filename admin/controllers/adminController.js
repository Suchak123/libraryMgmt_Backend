const userModel = require('../../models/userModel')
const bookModel = require('../../models/booksModel')
const categoryModel = require('../../models/categoryModel')

const adminDashboard = async(req,res) => {
    try{
        const userData = await userModel.find({}).count()
        const bookData = await bookModel.find({}).count()
        const categoryData = await categoryModel.find({}).count()

        res.status(200).send({
            success: true,
            message: "Admin Dashboard",
            allUsers: userData,
            allBooks: bookData,
            allCategories: categoryData
        })

    } catch(err) {
        res.status(500).send({
            success: false,
            message: "Error !",
            error: error.message
        })
    }
}

const viewUsers = async (req, res) => {
    try{
        const userData = await userModel.find({}).select('userName userEmail userProfilePic')
        res.status(200).send({
            success: true,
            message: "All Users Data",
            userData: userData,
        })
    } catch(error){
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

const userDetails = async (req,res) => {
    try{
        const { userId } = req.params
        const userData = await userModel.findById(userId).select('userName userEmail userProfilePic borrowBooks')
        if(userData){
            res.status(200).send({
                success: true,
                message: "User data found!",
                userData: userData
            })
        } else{
            res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

    } catch(error){
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

const borrowBooksList = async (req,res) => {
    try{
        const borrowBooks = await bookModel.find({
            bookStatus: "not available"
        }).select('bookName bookAuthor bookCategory bookImage')
        res.status(200).send({
            success: true,
            message: "Borrow books list",
            books: borrowBooks
        })
    } catch(error){
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
}

module.exports = {
    adminDashboard,
    viewUsers,
    userDetails,
    borrowBooksList,
}