function validatePayment(e) {
  //e.preventDefault;
  var num = document.getElementById('cardNumber').value;
  var expiry = document.getElementById('cardExpiry').value;
  var cvv = document.getElementById('cardCV').value;
  var name = document.getElementById('cardName').value;

  if (num == '' || cvv == '' || name == '' || expiry == '')
    alert('Please fill all the fields!!!');
  else if (num.length != 16) alert('Please enter card number in 16 digits!!!');
  else if (cvv.length != 3) alert('Please enter cvv number in 3 digits!!!');
  else {
    alert('Validated succesfully');
  }
}
