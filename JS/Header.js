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

// LOGOUT DISPLAY

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


var label1 = document
  .getElementById('loginDiv')
  .addEventListener('click', redirectTosignup);
function redirectTosignup() {
  window.location.href = './signup.html';
}

var data = JSON.parse(localStorage.getItem("ReebokCartList"));

var count = 0;
for(var i=0; i<data.length; i++)
    {
        if(loggedUser[0] == data[i].user)
            count++;
    }
console.log(count);

document.getElementById("CartValueChange").textContent = count;


function redirectToCart()
{
    window.location.href = "./cart.html";
}


document.getElementById("redirectToIndex").addEventListener("click",redirectToHome);
function redirectToHome()
{
    window.location.href = "./index.html"
}

