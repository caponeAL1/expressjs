//import expressjs
var expr=require("express");
var bparser=require('body-parser');
bparserinit=bparser.urlencoded({extended:false});
const req = require("express/lib/request");
const res = require("express/lib/response");

var app=expr();

var users=[{userID:"100",firstName:"Aravind",lastName:"LN"},
{userID:"101", firstName:"Ashfaq", lastName:"A"},
{userID:"103", firstName:"Santhos", lastName:"s"}];


function addNewUser(request,response)
{
  var user_id=request.body.uid;
  var first_Name=request.body.fname;
  var last_Name=request.body.lname;
  var rval=users.push({userID:user_id, firstName:first_Name, lastName:last_Name});
  response.send("<b>User Added, Total users:</b>"+ rval);
}




app.post('/addUser',bparserinit,addNewUser)


function retrieveUser(request,response)
{
    var status=false;
  var userid=request.query.uid 
  var firstName=request.query.firstName
  for(var user of users)
  {
    if(userid == user.userID)
    {       status=true;
         break;}
  } 
  if(status)
   response.send(user);
   else 
     response.end("<b>No employee with ID </b>"+ userid);
}
app.get("/getUser", retrieveUser);

function getAllUser(request, response) {

    const userNames = users.map((user) => user);

    response.send(userNames);

  }

  app.get('/getUsers', getAllUser);
  function deleteUser(request, response) {
    var status = false;
    var userId = request.query.uid;
    for (var i = 0; i < users.length; i++) {
        if (userId == users[i].userID) {
            status = true;
            users.splice(i, 1); // Remove the matching user
            break; // Exit the loop once a matching user is found
        }
    }
    if (status) {
        response.send(users); // Send the updated list of users after deletion
    } else {
        response.end("<b>No employee with ID</b> " + userId);
    }
}
app.get("/deleteUser", deleteUser);

var visitorCount = 0;
function home(request,response)
{
    var resp="<html><body><b>Welcome to our site..<br>";
    resp +="<a href=/welcome>Welcome page</a></body></html>";
    response.end(resp);
}
app.get('/', home)



function welcome(request,response){

    var today = new Date();

 

    visitorCount++;

    var resp="<html><body><h1>Welcome to my website</h1><p>Today is " + today;

    resp +="</p><p>Number of visitors: " + visitorCount;

    resp += "</p></body></html>";

    response.send(resp);

   

}

 app.get('/welcome',welcome);

 function feedback()

 {

     console.log("Server is listening on port 8000");

     console.log("Server is running at http://localhost:8000/welcome");

 

 }

app.listen(8000,feedback);