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

document.getElementsByClassName('accordion');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var panel = this.nextElementSibling;
    var panel2 = panel.nextElementSibling;

    console.log('-> ' + panel.style.maxHeight);
    console.log(panel2.scrollHeight);

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel2.style.maxHeight = null;
    } else if (!panel.style.maxHeight) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else if (panel2.style.maxHeight) {
      panel2.style.maxHeight = null;
    } else {
      panel2.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}

// js for signup page

var userList = JSON.parse(localStorage.getItem('userlist')) || [];
//  console.log(userList)
document
  .getElementById('registrationBtn')
  .addEventListener('click', registrationFn);

function registrationFn(event) {
  event.preventDefault();
  var fName = document.getElementById('fName').value;
  var lName = document.getElementById('lName').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var rePassword = document.getElementById('rePassword').value;
  var gender1 = document.getElementById('gender1');
  var gender2 = document.getElementById('gender2');

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
    alert('Please fill Complete details');
  } else if (password == rePassword) {
    // Object for user details to store in array
    var userDetails = {
      userfName: fName,
      userlName: lName,
      useremail: email,
      userpassword: password,
      usergender: gender
    };
    // USER VALIDATION ALREADY REGISTERED OR NOT

    var flag = false;

    for (var j = 0; j < userList.length; j++) {
      if (userList[j].useremail == userDetails.useremail) {
        // presence=true;
        flag = true;
        break;
      }
    }
    if (flag) {
      alert('Email id already exsists..!!!');
    } else {
      userList.push(userDetails);
      localStorage.setItem('userlist', JSON.stringify(userList));

      //              window.location.href = "login.html";
      alert('Your account is created, now you can Login.');
      location.reload();
    }
  } else {
    alert('password Not Matched');
  }
}

// SIGN IN FUNCTION WORKING functionality
document.getElementById('signInBtn').addEventListener('click', signInFn);

// data stored in localStorage  array  - "userList"

function signInFn(e) {
  e.preventDefault();

  // DATA FROM INPUT SIGN IN EMAIL PASSWORD
  var sEmail = document.getElementById('signEmail').value;

  var sPassword = document.getElementById('signPassword').value;

  // IN IF CONDITION ADMIN LOGIN AND IN ELSE CUSTOMER LOGIN

  var flag = false;

  var loggedInUser = [];

  for (var i = 0; i < userList.length; i++) {
    if (
      userList[i].useremail == sEmail &&
      userList[i].userpassword == sPassword
    ) {
      loggedInUser.push(userList[i].useremail);
      loggedInUser.push(userList[i].userfName);
      loggedInUser.push(userList[i].userlName);
      flag = true;
      break;
    }
  }

  if (flag) {
    localStorage.setItem('LoggedInUser', JSON.stringify(loggedInUser));
    window.location.href = './index.html';
  } else {
    alert('Wrong Credentials!!!');
  }
}

// FUNCTION FOR GUEST LOGIN CHECKBOX
document.getElementById('checkbox').addEventListener('change', checkboxFn);
function checkboxFn() {
  var form = document.createElement('form');

  var h4 = document.createElement('h4');
  h4.textContent = 'PLEASE ENTER YOUR EMAIL ID';

  var input = document.createElement('input');
  input.setAttribute('placeholder', 'Email');
  input.setAttribute('class', 'input');
  input.style.marginBottom = '40px';

  var br1 = document.createElement('br');
  var br2 = document.createElement('br');
  var br = document.createElement('br');
  var btn = document.createElement('button');
  btn.textContent = 'Continue As Guest';
  btn.setAttribute('id', 'signInBtn');

  var signDiv = (document.getElementById('signInDiv').style.display = 'none');
  form.append(h4, br1, input, br, btn);
  var divForGuestUse = document.getElementById('divForGuestUse');
  divForGuestUse.append(form);
}
document.getElementById('logoutDiv').addEventListener('click', logOut);
// LOGOUT DISPLAY

var loggedUser = JSON.parse(localStorage.getItem('LoggedInUser'));

if (loggedUser != null) {
  var div = document.getElementById('logoutDiv');
  div.style.display = 'block';
  document.getElementById('userNamelabel').textContent = loggedUser[1];
  var div2 = document.getElementById('loginDiv');
  div2.style.display = 'none';
} else {
  var div = document.getElementById('logoutDiv');
  div.style.display = 'none';
  var div2 = document.getElementById('loginDiv');
  div2.style.display = 'block';
}
function logOut() {
  localStorage.removeItem('LoggedInUser');
  location.reload();
  // var user = document.createElement.textContent('userId');
}
