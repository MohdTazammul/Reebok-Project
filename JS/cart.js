
var wholeData = JSON.parse(localStorage.getItem("ReebokProductsList"));

var data = JSON.parse(localStorage.getItem("ReebokCartList"));

var usefulData = [];

var loggedUser = JSON.parse(localStorage.getItem("LoggedInUser"));
var userID = null;

//console.log(loggedUser);
//console.log(data)
//console.log(wholeData)


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

//console.log(usefulData);

var leftSection = document.querySelector(".left-section");

var totalAmount  = 0;

function showProducts() {
    
 totalAmount = 0;
        leftSection.textContent = "";
    usefulData.map(function (item) {
        var hr = document.createElement("hr");
        
        var lb1 = document.createElement("label");
        lb1.setAttribute("class","ships");
        lb1.textContent = "Ships In 2-7 Days.";
        
        var dv1 = document.createElement("div");
        dv1.setAttribute("class","product-section")
        
         var dv2 = document.createElement("div");
        
         var img1 = document.createElement("img");
        img1.setAttribute("src",item.img);
        img1.setAttribute("height","150px");
        img1.setAttribute("width","150px");
        
        dv2.append(img1);
        
       var dv3 = document.createElement("div");
         
            var lb2 = document.createElement("label");
            lb2.setAttribute("class","vertical-text-height");
            lb2.setAttribute("id","title");
            lb2.textContent = item.title;
        
            var br1 = document.createElement("br");
            var lb3 = document.createElement("label");
            lb3.textContent = "Color : ";
           
            var lb4 = document.createElement("label");
            lb4.setAttribute("id", "color")
            lb4.textContent = item.color;
        
            
            var br2 = document.createElement("br");
            var lb5 = document.createElement("label");
            lb5.textContent = "Size : ";
           
            var lb6 = document.createElement("label");
            lb6.setAttribute("id", "size")
            lb6.textContent = item.size;
            
        
            var br3 = document.createElement("br");
            var lb7 = document.createElement("label");
            lb7.textContent = "Product Identifier : ";
           
            var lb8 = document.createElement("label");
            lb8.textContent = item.id;
        
            
            var br4 = document.createElement("br");
            var btn1 = document.createElement("button");
            btn1.textContent = "Remove Item";
            btn1.addEventListener("click",removeItem);
        
        dv3.append(lb2, br1, lb3, lb4, br2, lb5, lb6, br3, lb7, lb8, br4, btn1); 
        
        var dv4 = document.createElement("div");
        dv4.textContent = "Qty: ";
        
        var inp1 = document.createElement("input");
        inp1.setAttribute("type", "number");
        inp1.setAttribute("id", "qty");
        
        inp1.value = 1;
        
        dv4.append(inp1);
        
        var dv5 = document.createElement("div");
       
        var btn2 = document.createElement("button");
        btn2.textContent = "Update";
        
        var lb9 = document.createElement("label");
        lb9.setAttribute("id","salePrice");
        
        lb9.innerHTML = "&#8377;"+Math.floor(item.price-(item.price*item.discount/100))+".00";
        
//        console.log(totalAmount);   
        totalAmount += parseInt(Math.floor(item.price-(item.price*item.discount/100)));
        
        var br5 = document.createElement("br");
        
        var lb10 = document.createElement("label");
        lb10.setAttribute("class","oldPrice");
        
        lb10.innerHTML = "&#8377;"+item.price+".00";
        
        dv5.append(btn2, lb9, br5, lb10);
        
        dv1.append(dv2, dv3, dv4, dv5)
        
        
        leftSection.append(hr, lb1, dv1);
    });
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


function removeItem(e)
{

var removeId = (e.target.previousElementSibling.previousElementSibling.textContent);
var removeSize =   e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    
    var removeColor = e.target.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
//    console.log(removeId, removeColor, removeSize);
    
    for(var i=0; i<usefulData.length; i++)
        {
            if(usefulData[i].id == removeId && usefulData[i].color == removeColor && usefulData[i].size == removeSize)
                {
                    usefulData.splice(i, 1);
                    removeProductfromCart(removeId, removeColor, removeSize);
                    showProducts();
                    changeTotal();
                    break;
                }
        }   
}

function removeProductfromCart(removeId, removeColor, removeSize)
{
//    console.log(data);
    for(var i=0; i<data.length; i++)
        {
            if(data[i].id == removeId && data[i].color == removeColor && data[i].size == removeSize)
                {
                    data.splice(i, 1);
                }
        }
    localStorage.setItem("ReebokCartList", JSON.stringify(data));
}

document.getElementById("cont-shopping").addEventListener("click",redirectToProduct);

function redirectToProduct()
{
    window.location.href = "./Product.html";
}

document.getElementById("checkout").addEventListener("click",redirectToCheckout);

function redirectToCheckout()
{
    window.location.href = "./delivery.html";
}




