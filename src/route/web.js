import express from 'express';
import homeController from '../controller/webController'
import userController from '../controller/userController'
import doctorController from '../controller/doctorController'
import patientController from '../controller/patientController'
import specialtyController from '../controller/specialtyController'
import clinicController from '../controller/clinicController'

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/',homeController.getHomePage) 
    router.get('/about',homeController.getAboutPage)
    router.get('/get-crud',homeController.getCRUD)
    router.post('/post-crud',homeController.postCRUD)
    router.get('/display-crud',homeController.displayCRUD)
    router.get('/edit-crud',homeController.editCRUD)
    router.post('/put-crud',homeController.putCRUD)
    router.get('/delete-crud',homeController.deleteCRUD)

    //user CRUD routes
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-user',userController.handleGetAllUser)
    router.post('/api/create-user',userController.handleCreateUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/getallcode',userController.getAllCode)

    //doctor routes
    router.get('/api/top-doctor-home',doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctor',doctorController.getAllDoctor)
    router.post('/api/save-infor-doctor',doctorController.postInforDoctor)
    router.get(`/api/get-detail-doctor-by-id`,doctorController.getDetailDoctorId)
    router.post(`/api/bulk-create-schedule`,doctorController.bulkCreateSchedule)
    router.get(`/api/get-schedule-by-date`,doctorController.getScheduleByDate)
    router.get(`/api/get-extra-infor-doctor-by-id`,doctorController.getExtraInforDoctorById)
    router.get(`/api/get-profile-doctor-by-id`,doctorController.getProfileDoctorById)
    router.get(`/api/get-list-patient-for-doctor`,doctorController.getListPatientForDoctor)
    router.post(`/api/send-remedy`,doctorController.sendRemedy)
    
    

    //patient routes    
    router.post('/api/patient-booking-appointment', patientController.postBookAppointment)
    router.post('/api/verify-booking-appointment', patientController.postVerifyBookAppointment)
    
    //specialty
    router.post('/api/create-new-specialty',specialtyController.createSpecialty)
    router.get('/api/get-specialty',specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id',specialtyController.getDetailSpecialtyById)

    //clinic
    router.post('/api/create-new-clinic',clinicController.createClinic)
    router.get('/api/get-clinic',clinicController.getAllClinic)
    router.get('/api/get-detail-clinic-by-id',clinicController.getDetailClinicById)

    return app.use('/', router)
}

module.exports = initWebRoutes;