var mysql=require('mysql');
var exp=require('express');
var app=exp();
var bparser=require('body-parser');
var bparserinit=bparser.urlencoded({extended:false});
var cors=require('cors');
const res = require('express/lib/response');
app.use(cors());
app.use(exp.json());
 const con=mysql.createConnection({
    localhost:"localhost",
    user:"root",
    password:"root",
    database:"world",
    port:3306  
});
function checkConnection(error){
    if(error==undefined){
        console.log("connected");
    }
    else{
        console.log("Error Code:"+error.errno);
        console.log("Message:"+error.Message);
    }
}  
 
function feedback(error){
    if(error==undefined){
        console.log("Connected successfully");
       
    }
    else{
        console.log("Error Code:"+error.errno)
 
}
}
app.listen(9999,feedback);
var queryresults=undefined;
function processResults(error, result) {
    queryresults = result;
    console.log("Result: "+result);
}
function GetUserbyId(req,res){
    var userId=req.query.id;//101
    con.connect(checkConnection);
    con.query('select * from users where userID=?',[userId],processResults);
    res.send(queryresults);
    }
app.get('/GetUserbyId',GetUserbyId);
function GetUserbyEmail(req,res){
    var Email=req.query.email;//101
    con.connect(checkConnection);
    con.query('select * from users where EmailID=?',[Email],processResults);
    res.send(queryresults);
}
app.get('/GetUserbyEmail',GetUserbyEmail);
function DisplayAllUser(req,res){
    con.connect(checkConnection);
    con.query('select * from users',processResults);
    res.send(queryresults);
}
app.get('/DisplayAllUser',DisplayAllUser);
function AddUser(req,res){
    var userId=req.body.id;//101
    var password=req.body.pass;//Aakash
    var Email=req.body.email;//Kumar
    con.connect(checkConnection);
    con.query('insert into users (userID,Password,EmailID) values(?,?,?)',[userId,password,Email],checkInsertStatus);
   
   res.send(JSON.stringify(statusMessage));
}
app.post('/AddUser',bparserinit,AddUser);
function UpdateUser(req,res){
    var userId=req.body.id;//101
    var password=req.body.pass;//Aakash
    var Email=req.body.email;//Kumar
    con.connect(checkConnection);
    con.query('update users set Password=?,EmailID=? where userID=?',[password,Email,userId],processResults);
    con.commit();
    res.send(queryresults);
}
app.put('/UpdateUser',bparserinit,UpdateUser);
function DeleteUser(req,res){
    var userId=req.query.id;//101
    con.connect(checkConnection);
    con.query('delete from users where userID=?',[userId],processResults);
    con.commit();
    res.send(queryresults);
}
app.delete('/DeleteUser',DeleteUser);
var statusMessage="";
function checkInsertStatus(error){
    statusMessage=((error==undefined)? "<b>insert successful </b>":
    "<b>insert failure</b>" + error.message + "</b>")
} 
   


function provideAllContact(error,result)
{
    queryresults=result;
    console.log(queryresults);
}

// function addUser(request,response)
// {
//     var firstName= req.body.firstName;
//     var lastName= req.body.lastName;
//     var email= req.body.email;
//     var Address= req.body.Address;
//     var Number=req.body.mobileNumber;
//     mssqlconnection.query("INSERT INTO Contacts(firstName,lastName,email,Address,mobileNumber) Values(?,?,?,?,?)",[firstName,lastName,email,Address,mobileNumber],provideAllContact);
//     mssqlconnection.commit();
//     response.send(queryresults);
// }
app.post("/addContacts",bparserinit,addContacts);
function addContacts(request,response)
{
    console.log(request.body.firstName);
    var firstName= request.body.firstName;
    var lastName= request.body.lastName;
    var email= request.body.email;
    var Address= request.body.Address;
    var Number=request.body.mobileNumber;
    con.query("INSERT INTO Contacts(firstName,lastName,mobileNumber,Address,email) Values(?,?,?,?,?)",[firstName,lastName,Number,Address,email],provideAllContact);
    con.commit();
    response.send(queryresults);
}
function DisplayAllContact(request,response)
{
    con.connect(checkConnection);
    con.query("select * from Contacts",provideAllContact);
    response.send(queryresults);
}
app.get("/DisplayAllContact",DisplayAllContact);

app.post("/addContact",bparserinit,addContact);

function addContact(request,response){
    console.log(request.body.firstName);
    var firstName= request.body.firstName;
    var lastName= request.body.lastName;
    var email= request.body.email;
    var Address= request.body.Address;
    var Number=request.body.mobileNumber;
    con.query("INSERT INTO Contacts(firstName,lastName,mobileNumber,Address,email) Values(?,?,?,?,?)",[firstName,lastName,Number,Address,email],provideAllContact);
    con.commit();
    response.send(queryresults);
}
   
function Login(request,response){
    var userId=request.query.id;
    var password=request.query.pass;
    con.connect(checkConnection);
    con.query('select * from users where userid=? and password=?',[userId,password],processResults);
    response.send(queryresults);
}
app.get('/Login',Login);
function UpdateContact(request,response){
    var firstName= request.body.firstName;
    var lastName= request.body.lastName;
    var email= request.body.email;
    var Address= request.body.Address;
    var Number=request.body.mobileNumber;
    con.connect(checkConnection);
    con.query('update Contacts set lastName=?,mobileNumber=?,Address=?,email=? where firstName=?',[lastName,Number,Address,email,firstName],processResults);
   
    response.send(queryresults);
    con.commit();
}
app.put('/UpdateContact',bparserinit,UpdateContact);

function DeleteContact(request,response){
    var firstName1= request.query.firstName;
    console.log(firstName1);
    con.connect(checkConnection);
    con.query('delete  from Contacts where  firstName=?',firstName1,processResults);
    con.commit()
    response.send(queryresults);
}
app.delete('/DeleteContact',DeleteContact);

