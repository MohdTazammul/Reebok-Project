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
