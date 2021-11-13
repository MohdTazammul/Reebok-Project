document.getElementById('submit').addEventListener('click', verifyOTP);
document.getElementById('goBack').addEventListener('click', goToPreviousPage);

function verifyOTP(event) {
  if (document.getElementById('otp').value == '1234')
    alert('payment successful');
  else {
    alert('Invalid OTP');
  }
}

function goToPreviousPage(e) {
  window.location.href = './paymentGateway.html';
}
