const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  // console.log(firstName+" "+lastname);
  // console.log(email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastname,
        },
      },
    ],
  };
  const jsondata = JSON.stringify(data);
  const url = "https://us18.api.mailchimp.com/3.0/lists/6932bfde6f";
  const options = {
    method: "POST",
    auth: "vishu:a157f44bfe37fd9d235f3e8204kjuejgsf-us18",
  };

  const request=https.request(url, options, function (response) {
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    });
});
  request.write(jsondata);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT ||3000, () => {
  console.log("sever runing on port 3000");
});
// a157f44bfe37fd9d235f3e8204c7878a-us18
// 6932bfde6f
