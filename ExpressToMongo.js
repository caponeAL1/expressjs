var exp=require ('express');
var dot=require('dotenv');
var mon=require('mongoose');
var app=exp();
var bparser=require('body-parser');
var bparserinit=bparser.urlencoded({extended:false});


mon.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000t&appName=ExpressToMongo")
.then (() => {
    console.log("connected");   
}
).catch((err) => {
    console.log(err);
    process.exit(1);
})
const userSchema={userId:String,password:String,emailId:String};
var UserData=mon.model('users',userSchema);
//model(<collectionName>,<schemaName or structureofthecollection>)

function addNewUser(request,response)
{
  
    var udata=new UserData({'userId': 'request.body.uid','password':'request.body.password','emailId':'request.body.emailid'});
    udata.save().then((data)=>console.log("Inserted Successfully"));
    response.send("<b> Inserted data successfully");
    udata.catch((error)=>
    {
        console.log(error);
        response.send("<b> Insertion Failed");
    }) 
}
app.post('/addUser',bparserinit,addNewUser);

function getUser(request,response){

    UserData.find().then((data)=>{
        response.send(data);
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })}
    app.get('/getUser',getUser);

app.listen(8000,function(error){
    if(error!=undefined){
        console.log("error.message")
    }
    else{
        console.log("http://localhost:8000/")
        
    }
    
});

function UpdateUser(request,response){

    var uData=UserData.findOne({userId:request.body.uid}); 
     uData.updateOne({$set:{ password:request.body.password,emailId:request.body.emailid}}).then((data)=>{
         response.send(data);
     }).catch((err)=>{
         console.log(err);
     })
 }
 app.put('/UpdateUser',bparserinit,UpdateUser);

 function deleteUser(request,response){
 
    UserData.deleteOne({UserId:request.body.uid}).then((data)=>{
        response.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
app.delete('/deleteUser',bparserinit,deleteUser);


