// COLLAPSIBLE MENU

function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
  document.body.style.backgroundColor = 'rgba(0,0,0,0.6)';
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
  document.body.style.backgroundColor = 'white';
}

var acc = document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}

var acc2 = document.getElementsByClassName('accordion2');
var j;

for (j = 0; j < acc2.length; j++) {
  acc2[j].addEventListener('click', function () {
    this.classList.toggle('active2');
    var panel2 = this.nextElementSibling;
    //    if (panel2.style.maxHeight) {
    //      panel2.style.maxHeight = null;
    //    } else {
    panel2.style.maxHeight = '200px';
    //    }
  });
}


// js for signup page

var userList = JSON.parse(localStorage.getItem("userlist")) || [];
  //  console.log(userList)
  document
    .getElementById("registrationBtn")
    .addEventListener("click", registrationFn);

  function registrationFn(event) {
    event.preventDefault();
    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;
    var gender1 = document.getElementById("gender1");
    var gender2 = document.getElementById("gender2");

    if (gender1.checked == true) {
      var gender = gender1.value;
    } else if (gender2.checked == true) {
      gender = gender2.value;
    }

    if (
      !fName.length ||
      !lName.length ||
      !email.length ||
      !password.length ||
      !rePassword.length ||
      gender == undefined
    ) {
      alert("Please fill Complete details");
    }
     else if (password == rePassword) {
      // Object for user details to store in array
      var userDetails = {
        userfName: fName,
        userlName: lName,
        useremail: email,
        userpassword: password,
        usergender: gender,
      };
      // USER VALIDATION ALREADY REGISTERED OR NOT
        if(userList.length>0){
            for (var j = 0; j < userList.length; j++) {
            if (userList[j].useremail == userDetails.useremail) {
              // presence=true;
              alert("Already Register Please signin or Use Different Email");
            } else {
              userList.push(userDetails);
              localStorage.setItem("userlist", JSON.stringify(userList));
              window.location.href = "product.html";
            }
          }
       }else{
        userList.push(userDetails);
              localStorage.setItem("userlist", JSON.stringify(userList));
              window.location.href = "product.html";
       }

      
    } 
    else {
      alert("password Not Matched");
    }
  }

  // SIGN IN FUNCTION WORKING functionality
  document.getElementById("signInBtn").addEventListener("click", signInFn);

  // data stored in localStorage  array  - "userList"

  function signInFn(e) {
    e.preventDefault();

    // DATA FROM INPUT SIGN IN EMAIL PASSWORD
    var sEmail = document.getElementById("signEmail").value;

    var sPassword = document.getElementById("signPassword").value;

    // IN IF CONDITION ADMIN LOGIN AND IN ELSE CUSTOMER LOGIN
    if (sEmail == "admin" && sPassword == "admin") {
      window.location.href = "admin.html";
    } else {
      for (var i = 0; i < userList.length; i++) {
        if (
          userList[i].useremail == sEmail &&
          userList[i].userpassword == sPassword
        ) {
          alert("Login Successfully");
          // we have to set product page here for customer view
          window.location.href = "product.html";
        }else if(userList[i].useremail == sEmail){
          alert("Incorrect Password");
        }else{
          alert("Please Enter valid email address");
        }
      }
    }
  }

  // FUNCTION FOR GUEST LOGIN CHECKBOX
document.getElementById("checkbox").addEventListener("change" ,checkboxFn)
function checkboxFn(){

var form=document.createElement("form");

var h4=document.createElement("h4");
h4.textContent="PLEASE ENTER YOUR EMAIL ID";

var input=document.createElement("input");
input.setAttribute("placeholder","Email");
input.setAttribute("class","input");
input.style.marginBottom="40px"

var br1=document.createElement("br");
var br2=document.createElement("br");
var br=document.createElement("br")
var btn=document.createElement("button");
btn.textContent="Continue As Guest";
btn.setAttribute("id","signInBtn")

var signDiv=document.getElementById("signInDiv").style.display="none";
form.append(h4,br1,input,br,btn);
var divForGuestUse=document.getElementById("divForGuestUse");
divForGuestUse.append(form);
}
