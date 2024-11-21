const bookModel = require('../../models/booksModel');
const userModel = require('../../models/userModel');
const categoryModel = require('../../models/categoryModel');

const addBook = async (req,res) => {
    try{
        const bookImage = req.file ?`/uploads/BookImages/${req.file.filename}`: 'uploads/avatar/avatar2.webp' ;

        const isCategoryExist = await categoryModel.findOne({
            categoryName: req.body.bookCategory
        })

        if(!isCategoryExist){
            return res.status(401).send({
                success: false,
                messsage: "Category not exist in database",
            })
        }

        const newBook = new bookModel({
            bookName: req.body.bookName,
            bookDescription: req.body.bookDescription,
            bookAuthor: req.body.bookAuthor,
            bookCategory: req.body.bookCategory,
            bookImage,
        
        });

        await newBook.save();
        res.status(201).json({
            success: true,
            messsage: "Book added successfully",
            data: newBook,
        });
    } catch(error){
        console.log(req.file)
        res.status(500).json({
            success: false,
            messsage: "Error: Unable to add the book",
            error: error.messsage,
        });
    }
};

const deleteBook = async(req,res) => {
    try {
        const { bookId } = req.params
        const bookData = await bookModel.findByIdAndDelete(bookId);

        if(bookData) {
            return res.status(200).send({
                success: true,
                messsage: "Book deleted!",
                bookDeleted: bookData,
            })
        }
        res.staus(401).send({
            success: false,
            message: "Book not found!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
}

const editBook = async (req, res) => {
    try{
        const { bookId } = req.params
        const bookImage = req.file ? `/uploads/BookImages/${req.file.filename}` : undefined;
        const bookData = await bookModel.findByIdAndUpdate(bookId, {
            bookName: req.body.bookName || undefined,
            bookDescription: req.body.bookDescription || undefined,
            bookAuthor: req.body.bookAuthor || undefined,
            bookImage: bookImage,

        }, {
            new: true,
        })
        if(bookData) {
            return res.status(200).send({
                success: true,
                message: "Book updated!",
                bookData: bookData,
            })
        }
        res.status(401).send({
            success: false,
            message: "Book not found!"
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
}

const searchBookByName = async (req,res) => {
    try {
        const { bookName } = req.params
        const bookSearchData = await bookModel.find({ bookName: { $regex: `^${bookName}`, $options: "i"} }).select('bookName bookImage');
        if(bookSearchData.length <= 0) {
            return res.status(400).send({
                success: false,
                message: "Book not found!"
            })
        }
        res.status(200).send({
            success: true,
            message: "These books are found",
            bookFound: bookSearchData,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
}

const searchBookByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params
        
        const isCategoryExist = await categoryModel.findOne({
            categoryName: categoryName
        })
        if (!isCategoryExist) {
           
            return res.status(401).send({
                success: false,
                message: "Category not exist in database",
            })
        }
        
        const bookSearchData = await bookModel.find({
            bookCategory: categoryName
        }).select('bookName bookImage');
        
        res.status(200).send({
            success: true,
            message: "Book search data found!",
            bookData: bookSearchData,
        })
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
}

const bookDetails = async (req,res) => {
    try{
        const { bookId } = req.params
        const bookData = await bookModel.findById(bookId)

        const bookSelectData = await bookModel.findById(bookId).select('bookName bookDescription bookAuthor bookCategory bookImage')
        if(bookData){
            let isAvailable = "Available"
            if(bookData.bookStatus != "Available") {
                isAvailable = "not available"
            }

            res.status(200).send({
                success: true,
                message: "Book details found!",
                isAvailable: isAvailable,
                bookData: bookSelectData,
            })
        } else{
            res.status(401).send({
                success: false,
                message: "Book not found"
            })
        }
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Error!",
            error: error.message,
        })
    }
}

module.exports = {
    addBook,
    deleteBook,
    searchBookByName,
    searchBookByCategory,
    editBook,
    bookDetails,
}