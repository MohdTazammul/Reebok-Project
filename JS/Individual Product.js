 

//console.log(individualProductId);
     var url =  window.location.href;
     var output= "";
     for(var i=url.length-1; ;i--)
         {
             if(url[i] == "?")
                 break;
             else
                 output+=url[i];
         }
     output = output.split("").reverse().join("");
     console.log(output);
     
     var data = JSON.parse(localStorage.getItem("ReebokProductsList"));
     
     var arr = [];
     for(var i=0; i<data.length; i++)
         {
             if(data[i].id == output)
                 {
                     arr.push(data[i]);
                     break;
                 }
         }
     console.log(arr[0].title);
     
     document.getElementById("product-title").textContent = arr[0].title;
     document.getElementById("img-1").src = arr[0].imgUrl[0];
     
     document.getElementById("img-2").style.backgroundImage = "url('"+arr[0].imgUrl[0]+"')";
     
     var finalColor = arr[0].color[0];
     
             document.getElementById("left-slider-img").src = arr[0].imgUrl[0];

    document.getElementById("prodID").textContent = output;
     document.getElementById("discount").textContent = "-"+arr[0].discount+"% OFF";
     
     document.getElementById("effectivePrice").innerHTML = "&#8377; "+arr[0].price+".00";
     
     document.getElementById("salePrice").innerHTML = "&#8377;"+Math.floor(arr[0].price-(arr[0].price*arr[0].discount/100))+".00";
     
     var colors = "";
     for(var i=0; i<arr[0].color.length; i++)
         {
             colors+=arr[0].color[i]+" | ";
         }
     document.getElementById("colors").textContent = colors.substring(0, colors.length - 2);
     
     var imgDivContainer = document.getElementById("colors-imgs");
     
     var rightTick = "<i class='fas fa-check-circle'></i>"; 
     for(var i=0; i<arr[0].imgUrl.length; i++)
         {
             var mainSpan = document.createElement("span");
             mainSpan.setAttribute("class","imgsOptions")
             
             var imgTag = document.createElement("img");
             imgTag.setAttribute("src",arr[0].imgUrl[i]);
             
             
//             <i class="fa fa-check" aria-hidden="true"></i>
             
             
                     var span = document.createElement("span");
                     span.setAttribute("class", "right-tick");
                     span.setAttribute("id", "right-tick-1");
             
             if(i == 0)
                 {
                     span.innerHTML = rightTick;
                 }
//             var tickIcon = document.createElement("img");
//             tickIcon.setAttribute("src","")
             
             mainSpan.append(imgTag, span);
             
             imgDivContainer.append(mainSpan);
         }
     
     
     // Change Imag
            
        var x=  document.querySelectorAll(".individualProduct-Right .imgsOptions");
     
//     console.log(x);
        for(var y=0; y<x.length;  y++)
            {
                x[y].addEventListener("click", changeImage);
            }
    
    function changeImage()
    {        
        var temp = document.querySelectorAll(".right-tick");
        for(var i=0; i<temp.length; i++)
            temp[i].textContent ="";
        
        this.lastChild.innerHTML = rightTick;
        
        
//        console.log(this.firstChild);
        
        
        var imgSrc = this.firstChild.src;
        
        for(var i=0; i<arr[0].imgUrl.length;i++)
            {
                if(imgSrc == arr[0].imgUrl[i])
                    break;
            }
        finalColor = arr[0].color[i];
        
//        console.log(imgSrc);
        
        document.getElementById("img-1").src = imgSrc;
     
     document.getElementById("img-2").style.backgroundImage = "url('"+imgSrc+"')";
        
             document.getElementById("left-slider-img").src = imgSrc;
         
    }
     
     
     
     var selectSize = document.getElementById("subSelectSize");
     
     for(var i=0; i<arr[0].size.length; i++)
         {
             var opt = document.createElement("option");
             opt.setAttribute("value", arr[0].size[i]);
             opt.textContent  = arr[0].size[i];
             
             selectSize.append(opt);
         }
     
     
     
     // Change Imag
     
     
     // for Description and specification toggle
  function openTab(x,elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.border = "2px solid black";
  }
  document.getElementById(x).style.display = "block";
  
  elmnt.style.border = "none";
  elmnt.style.border = "2px solid maroon";
      elmnt.style.borderBottom = "3px solid maroon";

}
document.getElementById("defaultOpen").click();  

// FOR ZOOM IMAGE
let zoomer = function (){
  document.querySelector('#img-zoomer-box')
    .addEventListener('mousemove', function(e) {

    let original = document.querySelector('#img-1'),
        magnified = document.querySelector('#img-2'),
        style = magnified.style,
        x = e.pageX - this.offsetLeft,
        y = e.pageY - this.offsetTop,
        imgWidth = original.offsetWidth,
        imgHeight = original.offsetHeight,
        xperc = ((x/imgWidth) * 100),
        yperc = ((y/imgHeight) * 100);

    //lets user scroll past right edge of image
    if(x > (.01 * imgWidth)) {
      xperc += (.15 * xperc);
    };

    //lets user scroll past bottom edge of image
    if(y >= (.01 * imgHeight)) {
      yperc += (.15 * yperc);
    };

    style.backgroundPositionX = (xperc - 9) + '%';
    style.backgroundPositionY = (yperc - 9) + '%';

    style.left = (x - 180) + 'px';
    style.top = (y - 180) + 'px';

  }, false);
}();

     document.getElementById("add-to-cart").addEventListener("click", addToCart);
     
     var cart = JSON.parse(localStorage.getItem("ReebokCartList")) || [];
    
     
     function addToCart()
     {
         if(subSelectSize.value == "")
//             alert("plz selecte a size");
             document.querySelector(".select-size").style.display = "block";
         else
             {
                 var size = document.getElementById("subSelectSize").value;
                 var prId = output;
                 
//                 alert(prId+" - "+size+" - "+finalColor);
                 
                 
                  var flag = false;
        
        for(var i=0; i<cart.length; i++)
            {
                if(cart[i].id == output && cart[i].color == finalColor && cart[i].size == size)
                    {
                        flag = true;
                        break;
                    }
            }
        if(!flag)
            {
            var loggedUser  = JSON.parse(localStorage.getItem("LoggedInUser"));
//                console.log(loggedUser);
                if(loggedUser != null)
                   {
                var obj =
                    {
                        id : output,
                        size : size,
                        color : finalColor, 
                        user : loggedUser[0]
                    }
                       
                cart.push(obj);
                localStorage.setItem("ReebokCartList", JSON.stringify(cart));
                        
                   }
                   else
                   {
                        alert("You need to login first to add items in your cart!!!");
                   }
            }
        else
            {
                // Selected product already exists in cart, therefore cant add it to cart.
                alert("This Product is alredy in your cart....!!!");
            }
                 
             }
     }
     