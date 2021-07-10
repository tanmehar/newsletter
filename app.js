const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

mailchimp.setConfig({

     apiKey: "00772483e054853df88725e6eda4f840-us6",
     server: "us6"
    });

app.post("/",function(req,res){
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    console.log(firstName,","+lastName+","+email);

    const listId = "1ac38d4d06";

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
       };

       async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
        }
        });

        res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}

run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


app.listen(3000,function(req,res){
    console.log("listening at 3000");
});

// 00772483e054853df88725e6eda4f840-us6
// 1ac38d4d06

 
//   --user "anystring:${apikey}"' \
//   -d '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"double_optin":false,"marketing_permissions":false}'