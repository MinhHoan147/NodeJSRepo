import db from '../models/index';
import CRUDService from '../service/CRUDService'


let getHomePage = async (req, res) => {
    try {
        let Data = await db.User.findAll();

        return res.render('homePage.ejs', {
            Data: JSON.stringify(Data)
        });
    } catch (error) {
        console.log(error);
    }

}

let getAboutPage = (req, res) => {
    return res.render('about/aboutPage.ejs')
}

let getCRUD = (req, res) => {
    return res.render('CRUD_demo.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createUser(req.body)
    console.log(message);
    return res.send('Hellp from postCRUD')
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.displayUser()
    return res.render('DisplayCRUD.ejs', {
        dataTable: data
    })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id

    if (userId) {
        let userData = await CRUDService.getUserById(userId)

        return res.render('Edit-CRUD.ejs', {
            userData: userData
        })

    } else {
        return res.send('User not found')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allusers = await CRUDService.updateUserData(data)
    return res.render('DisplayCRUD.ejs', {
        dataTable: allusers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteUserById(id)
        return res.send('Delete Successfully')
    }else{
        return res.send('Delete Fail !')
    }

}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}