var form = document.getElementById("form")
var firstname = document.getElementById("fname")
var lastname = document.getElementById("lname");
var title = document.getElementById("title");
var email = document.getElementById("email");
var contact = document.getElementById("contact")
var locat = document.getElementById("location")
var roles = document.getElementById("roles");
var subjects = document.getElementById("subjects");
var err = [];


form.addEventListener("submit", (even)=>
{
    // let perform validation on the phone number
    if(contact.value.length < 9 || contact.value.length > 12)
    {
        err.push({name: "Phone number incorrect"})
        even.preventDefault();
    }
    
})