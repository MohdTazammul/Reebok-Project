
document.getElementById("continueCheckoutBtn").addEventListener("click",continueCheckoutFn);
var customerBillingAddress = JSON.parse(localStorage.getItem("customerBillingAddressLS"))||[];
// console.log(customerBillingAddress);
function continueCheckoutFn(){
  var fname=document.getElementById("fName").value;
  var lname=document.getElementById("lName").value;
  var street=document.getElementById("street").value;
  var landmark=document.getElementById("landmark").value;
  var state=document.getElementById("state").value;
  var pincode=document.getElementById("pincode").value;
  var mobile=document.getElementById("mobile").value;

  // console.log(fname,lname,street,state,pincode,mobile)
  customerBillingObject={
    Fname:fname,
    Lname:lname,
    Street:street,
    Landmark:landmark,
    State:state,
    Pincode:pincode,
    Mobile:mobile
  }
  customerBillingAddress.push(customerBillingObject)

  localStorage.setItem("customerBillingAddressLS",JSON.stringify(customerBillingAddress));
    
    window.location.href = "./Payment.html";
}

var wholeData = JSON.parse(localStorage.getItem("ReebokProductsList"));

var data = JSON.parse(localStorage.getItem("ReebokCartList"));

var usefulData = [];

var loggedUser = JSON.parse(localStorage.getItem("LoggedInUser"));
var userID = null;

if (loggedUser != null) {
    var userID = loggedUser[0];
}
for(var i=0; i<data.length; i++)
    {
//        console.log(data[i].user)
        if(data[i].user == userID)
            {
                  for(var j=0; j<wholeData.length; j++)
                      {
                          if(data[i].id == wholeData[j].id)
                              {
                                  for(var k=0; k<wholeData[j].color.length; k++)
                                      {
                                          if(data[i].color == wholeData[j].color[k])
                                              var imgData = wholeData[j].imgUrl[k];
                                      }
                                  
                                  var obj =
                                      {
                                          id : data[i].id,
                                          title : wholeData[j].title,
                                          color : data[i].color,
                                          img : imgData,
                                          size : data[i].size,
                                          qty : 1,
                                          price : wholeData[j].price,
                                          discount : wholeData[j].discount
                                      }
                                  usefulData.push(obj);        
                              }
                      }
            }
    }

console.log(usefulData);




var mainDiv = document.getElementById("cards-cont");

var totalAmount  = 0;

function showProducts() {
    
 totalAmount = 0;
    usefulData.map(function (item) {
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("class","card");
        
        var div1 = document.createElement("div");
        var img = document.createElement("img");
        img.src = item.img;
        
        div1.append(img);
        
        var div2 = document.createElement("div"); 
        var lb1 = document.createElement("label");
        lb1.textContent = item.title;
               
        var br1 = document.createElement("br");
        var lb2 = document.createElement("label");
        
        lb2.textContent = "SIZE : "+item.size;
        
              
        var br2 = document.createElement("br");
        var lb3 = document.createElement("label");
        
        lb3.textContent = "QTY : "+item.qty;
        
              
        var lb4 = document.createElement("label");
        
        lb4.innerHTML =" @ &#8377;" +Math.floor(item.price-(item.price*item.discount/100))+".00"
//        lb4.text = "@ 	&#8377; : " +Math.floor(item.price-(item.price*item.discount/100))+".00";
        
        totalAmount += parseInt(Math.floor(item.price-(item.price*item.discount/100))); 
        
         var br4 = document.createElement("br");
        var btn = document.createElement("button");
        btn.textContent = "Edit";
        btn.addEventListener("click",redirectToBag)
        
        div2.append(lb1, br1, lb2, br2, lb3, lb4, br4, btn)
        div1.append(img);
        
        cardDiv.append(div1, div2);
        
        mainDiv.append(cardDiv);
    });
}

document.getElementById("totalItem").textContent = "("+usefulData.length+" Items)";

console.log(totalAmount);

    var x = document.querySelectorAll("#total-price");
//console.log(x);
for(var i=0; i<x.length; i++)
    {
        x[i].innerHTML = "&#8377;"+totalAmount+".00";
    }

function redirectToBag()
{
    window.location.href = "./cart.html"
}

if(usefulData.length == 0)
    {
        document.getElementById("noProducts").style.display = "block";
    }
else{
    showProducts();
}

changeTotal();

function changeTotal()
{
    var x = document.querySelectorAll("#total-price");
//console.log(x);
for(var i=0; i<x.length; i++)
    {
        x[i].innerHTML = "&#8377;"+totalAmount+".00";
    }
}


