const express = require("express")
const cors = require("cors")
const app = express();
const validation = require('./validation')
const database = require('./dataBaseInteraction')

app.use(cors({
    origin: '*'
}))

app.get('/profile',(req,res)=>{

    let statusMessage = {}
    
    // Check if confirmation message is successful or not (Confirmation ID: marcus-1234)
    const validationOutcome = validation.confirmIdentificataion(res.ID);
    if(validationOutcome === false){
        statusMessage["validationOutcome"] = validationOutcome
        res.send(statusMessage);
        // STOPS RUNNING
    }

    // Check if data is valid 
    const criteriaMatchOutcome = validation.dataCriteriaMatch(res.data);
    if(criteriaMatchOutcome === false){
        statusMessage["criteriMatchOutcome"] = criteriaMatchOutcome;
        res.send(statusMessage);
        // STOPS RUNNING
    } 

    // save data to the database
    const saveStatus = database.saveDataToDatabase(res.data)
    statusMessage["saveStatus"] = saveStatus;
    res.send(statusMessage);
    // STOPS RUNNING

})

app.get('/editProfile',(req,res)=>{
    let confirmation = null;
    let saveStatus = {success: true}
    // Check confirmation ID is correct

    confirmation = true;
    
    // Check if the data to be saved match the criteria it is suppose to
    if(confirmation === false){
        saveStatus.success = false;
    }

    // Save the data
    if(confirmation === true){
        saveStatus.success = true;

    }

    
    res.send(saveStatus);
})

app.get('/save',(req,res)=>{
    // Check if each data match the criteria
    // Save the data

    let outcome = {
        DataSavedSuccessfully: true
    }
    
    

    // Lets say everything matches
    res.send(outcome);
})

app.get('/register',(req,res)=>{
    const registrationDetails = req.query;
    console.log(registrationDetails)
    // I NEED TO CHECK IF THE REGISTERATION PASSES OR NOT
    let dataTemplate = {
        registrationOutcome: "",
        photo: "",
        Name: "",
        Contact: "",
        Email: ""
    }
    
    let successFulRegistration = false
    // State if the registration was successful or not
    if(successFulRegistration === true){
        dataTemplate.registrationOutcome = true
        
    } if (successFulRegistration === false){
        dataTemplate.registrationOutcome = false;
    }
    console.log(dataTemplate)
    res.send(dataTemplate);

})

app.get('/login',(req,res)=>{
    const email = req.query.email
    const password = req.query.password
    let dataTemplate = {
        loginSuccess: null,
        photo: null,
        name: null,
        contact: null,
        email: null
    }
    console.log(email)
    console.log(password)

    if(email === "hello" && password === "goodbye"){
        dataTemplate.loginSuccess = true;
    }else{
        dataTemplate.loginSuccess = false;
    }

    res.send(dataTemplate)
}) 

app.listen(3000,()=>{
    console.log("listening to port 3000......")
})