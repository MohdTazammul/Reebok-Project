 function shuffle(array) {

  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
    var data = JSON.parse(localStorage.getItem("ReebokProductsList"));
    
    var productsContainer = document.querySelector(".products-container");

    showProducts(data);
    // show products function
    function showProducts(em)
    {    
        var ln = em.length;
        
        document.getElementById("totalProducts").textContent = em.length;
        document.querySelector(".products-container").textContent="";
//        console.log("this is data "+productsData);
        em.map(function (item)
            { 
                var cardDiv = document.createElement("div");
                cardDiv.setAttribute("class","card1");
               
//            cardDiv.setAttribute("onclick","redirectToIndividualPage()")
            
                var subDiv1 = document.createElement("div");
                
                var img1 = document.createElement("img");
                img1.setAttribute("src",item.imgUrl[0]);
                
                
                img1.addEventListener("click", redirectToIndividualPage);
            
                var label1 = document.createElement("label");
                label1.setAttribute("class","discount-tag");
                
                label1.textContent = "-"+item.discount+"%";
            
                        
                var subDiv2 = document.createElement("div");
                subDiv2.setAttribute("class","hover-product-imgs");
                    
                    
                var btn1 = document.createElement("button");
                btn1.innerHTML = "&#10096;";
            
                subDiv2.append(btn1);
            
                for(var i=0; i<item.imgUrl.length; i++)
                    {
                         var btn2 = document.createElement("button");
                btn2.setAttribute("class","img");
            
                var img2 = document.createElement("img");
                img2.setAttribute("src",item.imgUrl[i]);
                img2.setAttribute("height","30px");
                img2.setAttribute("width","30px");
                btn2.append(img2);
                        
                        subDiv2.append(btn2);
                    }
            
            
                        
                var subDiv3 = document.createElement("div");
            
                var lastbtn = document.createElement("button");
                lastbtn.innerHTML = "&#10097;";
                
                subDiv3.append(lastbtn);
            
                subDiv2.append(subDiv3);
            
                subDiv1.append(img1, label1, subDiv2);
            
                var subDiv2 = document.createElement("div");
                
                var label2 = document.createElement("label");
            label2.setAttribute("class", "product-title vertical-text-height");
            label2.textContent = item.title;
            
            
            
                var br1 = document.createElement("br");

                var label3 = document.createElement("label");
            label3.setAttribute("id", "effective-price");
            
            label3.innerHTML = "&#8377;"+Math.floor(item.price-(item.price*item.discount/100));
            
                var label4 = document.createElement("label");
            label4.setAttribute("id", "orignal-price");
            label4.innerHTML = "&#8377;"+item.price;
            
            subDiv2.append(label2, br1, label3, label4);
            
            
                subDiv2.addEventListener("click", redirectToIndividualPage2);
            
                var subDiv3 = document.createElement("div");
                
                var label5 = document.createElement("label");
            label5.textContent = "SIZE : ";
            
            subDiv3.append(label5);
                for(var i=0; i<item.size.length; i++)
                    {
                         var spanTag = document.createElement("span");
                        spanTag.textContent = item.size[i];
                        spanTag.addEventListener("click",sizeToggle);
                        subDiv3.append(spanTag);
                        
                    }
            
            var btn3 = document.createElement("button");
            btn3.setAttribute("class","add-to-cart")
            btn3.innerHTML = "ADD TO CART <i class='cart-circle fas fa-shopping-cart'></i>";
            
            var idLabel = document.createElement("label")
            idLabel.textContent = item.id;
            idLabel.style.display = "none";
            
            btn3.addEventListener("click", addToCart);
            
            subDiv3.append(btn3, idLabel);
            
            
            
                cardDiv.append(subDiv1, subDiv2, subDiv3);
                productsContainer.append(cardDiv);
                                 
        });
    }
    
    var finalSize = null;
    
    function sizeToggle(e)
    {
        if(e.target.style.backgroundColor != "maroon")
            {
//                console.log(e.target.textContent);
                finalSize = e.target.textContent;
                
//                console.log(e.target.parentElement.getElementsByTagName("span"))
                var ln  = e.target.parentElement.getElementsByTagName("span");
                for(var i=0; i<ln.length; i++)
                    {
                        
                ln[i].style.backgroundColor = "white";
                ln[i].style.color = "black";
                    }
                e.target.style.backgroundColor = "maroon";
                e.target.style.color = "white";
               
                
            }
        else
            {
                finalSize = null;
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
            }
//        console.log(finalSize);
//        console.log(e.target);
    }
    
    // add to cart script
    var cart = JSON.parse(localStorage.getItem("ReebokCartList")) || [];
    
    function addToCart(e)
    {
        if(finalSize != null)
          {  
        
//        console.log(e.target.parentElement.parentElement);
        var imgsrc2 = (e.target.parentElement.parentElement.firstChild.firstChild.src);
        console.log(imgsrc2);
        
        
        
        var cardProductid = e.target.parentElement.lastChild.textContent;
        
        var finalColor = "";
        
        for(var i=0; i<data.length; i++)
            {
                if(data[i].id == cardProductid)
                    {
//                        console.log(data[i]);
                        for(var j=0; j<data[i].imgUrl.length; j++)
                            {
                                if(data[i].imgUrl[j] == imgsrc2)
                                    finalColor = data[i].color[j];
                            }
                    }
            }
        
//        console.log(finalColor);
        // Now check whether the product already exsist in cart or not
        
        var flag = false;
        
        for(var i=0; i<cart.length; i++)
            {
                if(cart[i].id == cardProductid && cart[i].color == finalColor && cart[i].size == finalSize)
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
                        id : cardProductid,
                        size : finalSize,
                        color : finalColor, 
                        user : loggedUser[0]
                    }
                       
                cart.push(obj);
                localStorage.setItem("ReebokCartList", JSON.stringify(cart));
                      alert("Product added in your cart succesfully"); 
                        var ln  = e.target.parentElement.querySelectorAll("span");
//                       console.log(ln)
                for(var i=0; i<ln.length; i++)
                    {
                        
                ln[i].style.backgroundColor = "white";
                ln[i].style.color = "black";
                    }
                       finalSize = null;
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
        else
            {
                alert("please select a size to add product in cart");
            }
    }
    
    // add to cart script
    
    
        // change product image on click
        
        var x=  document.querySelectorAll(".Product-Page .right-products .card1 .hover-product-imgs .img");
        for(var y=0; y<x.length;  y++)
            {
                x[y].addEventListener("click", changeImage);
            }
    
    function changeImage()
    {
        var productImg = this.firstElementChild;
        this.parentNode.parentElement.firstElementChild.src = productImg.src;   
    }
    // change product image on click
    
    // sort function
    function sortBy()
        {
            
            var temp = document.getElementById("sortByValue").value;
            if(temp == "low")
                {
                    var sorted = data;
                    sorted.sort(function (a,b)
                     {
                        return Math.floor(a.price-(a.price*a.discount/100)) - Math.floor(b.price-(b.price*b.discount/100)); 
                    });
                    showProducts(sorted);
                }
           else if(temp == "high")
                {
                    var sorted = data;
                    sorted.sort(function (a,b)
                     {
                        return Math.floor(b.price-(b.price*b.discount/100)) - Math.floor(a.price-(a.price*a.discount/100));
                    });
                    showProducts(sorted);
                }
            else if(temp == "default")
                {
                    alert("Defualt");
                    showProducts(data);
                }
            
        }
    // sort function
    
    
    function menFilter()
    {
        if(document.getElementById("men-filter").checked)
           {
                alert("Men");
           }
        else
            alert("Men Unchecked");
    }
    function womenFilter()
    {
        if(document.getElementById("women-filter").checked)
            alert("Women");
        else
            alert("Women Unchecked");
    }
    // show products function
    function msg()
    {
        alert("clicked");
    }
// Collapsible section of left filters
    var coll = document.getElementsByClassName("filter-container-main");
    var i;

    for (i = 0; i < coll.length; i++) 
    {
        coll[i].addEventListener("click", function() 
        {
            var content = this.nextElementSibling;
            var img = this.firstElementChild.firstElementChild;
//      content.style.maxHeight= 0;
            if (content.style.maxHeight != "0px"){
                content.style.maxHeight = "0px";
                img.src = "https://cdn.icon-icons.com/icons2/1883/PNG/512/caretsymbol_120671.png";
            } 
            else
            {
                content.style.maxHeight = content.scrollHeight + "px";
                img.src = "https://cdn.icon-icons.com/icons2/1883/PNG/512/downarrow_120663.png";
            } 
        }); 
    }
// Collapsible section of left filters   
    
    
    
    function redirectToIndividualPage(e)
    {
        var individualProductId = this.nextSibling.parentNode.parentElement.lastChild.lastChild.textContent;
        
        window.location.href = "./Individual%20Product.html?"+individualProductId;
        
    }
    
    function redirectToIndividualPage2(e)
    {
        var individualProductId = this.nextSibling.parentNode.lastChild.lastChild.textContent;
        
        window.location.href = "./Individual%20Product.html?"+individualProductId;
    }



  document.getElementById("men-filter").addEventListener("click", checkBoxFun);
  document.getElementById("women-filter").addEventListener("click", checkBoxFun);

  
  var checkRes = [];



function checkBoxFun(e) {
  e.target.checked;
  if (e.target.checked) {
    var res = data.filter(function (item) {

      return e.target.value == item.gender;

    });

    checkRes = [...checkRes, ...res];
     checkRes=shuffle(checkRes);

    showProducts(checkRes);
  } else {

    checkRes = checkRes.filter(function (item) {
      return e.target.value != item.gender;
    });

    if (checkRes.length > 0) {
         checkRes=shuffle(checkRes);

      showProducts(checkRes);

    } else {

      showProducts(data);
     
    }
  }

}


document.getElementById("footwear-Filter").addEventListener("click", checkBoxFun1);
document.getElementById("clothing-Filter").addEventListener("click", checkBoxFun1);

//   var checkRes = [];




function checkBoxFun1(e) {
   

  e.target.checked;

//   console.log(checkRes);

  if (e.target.checked) {

    var res = checkRes.filter(function (item) {
       
      return e.target.value == item.category;
    });
    checkRes = [...checkRes, ...res];

    //  checkRes=shuffle(checkRes);

    showProducts(checkRes);

  } else {

    checkRes = checkRes.filter(function (item) {
      return e.target.value != item.category;
    });
    if (checkRes.length > 0) {

        // checkRes=shuffle(checkRes);

      showProducts(checkRes);

    } else {
      showProducts(data);
     
    }
  }
}

   
   
    function menFilter()
    {
        

        if(document.getElementById("men-filter").checked)
           { 
                alert("Men");
               
                displayKey.push("men"); 

                console.log(displayKey)

        // showProducts(displayFromFilter)
    
           }

        else{
            
            alert("Men Unchecked");
            displayKey=displayKey.filter(x=> (x!="men"))
           
            console.log(displayKey)

        // showProducts(displayFromFilter)
       
        }


    }

//     displayKey.push("men"); 
// displayKey=displayKey.filter(x=> (x!="men"))

    function womenFilter()
    {
        if(document.getElementById("women-filter").checked)
            {
                alert("Women");
            
                displayKey.push("women"); 
        

        // showProducts(displayFromFilter)  
        console.log(displayKey)
        
    
     }           

        else{

            alert("Women Unchecked");

            displayKey=displayKey.filter(x=> (x!="women"))
      
            // showProducts(displayFromFilter)       
            console.log(displayKey)
        }   

    }

// 2nd filtter



    function footwearFilter()
    {
        

        if(document.getElementById("footwear-Filter").checked)
           { 
                alert("footwear");

                displayKey.push("footwear"); 
       
        // showProducts(footwearData)
        console.log(displayKey)
           }

        else{
            
            alert("footwear Unchecked");
       
            displayKey=displayKey.filter(x=> (x!="footwear"))
        
            // showProducts(displayFromFilter)
            console.log(displayKey)
        }


    }



    


function clothingFilter()
{
    

    if(document.getElementById("clothing-Filter").checked)
       { 
            alert("clothing");

            displayKey.push("clothing");
   
    // showProducts(footwearData)
    console.log(displayKey)
       }

    else{
        
        alert("clothing Unchecked");
        displayKey=displayKey.filter(x=> (x!="clothing"))
     
    // showProducts(displayFromFilter)
    console.log(displayKey)

    }


}


function shoesFilter()
{
    

    if(document.getElementById("shoes-Filter").checked)
       { 
            alert("shoes");

            displayKey.push("shoes");

            console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("shoes Unchecked");
        displayKey=displayKey.filter(x=> (x!="shoes"))

        console.log(displayKey)
    // showProducts(displayFromFilter)
   
    }


}



function sandalsSlippersFilter()
{
    

    if(document.getElementById("sandals/slippers-Filter").checked)
       { 
            alert("sandals/slippers");

            displayKey.push("sandals/slippers");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("sandals/slippers Unchecked");
        displayKey=displayKey.filter(x=> (x!="sandals/slippers"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}




function size1Filter()
{
    

    if(document.getElementById("size1").checked)
       { 
            alert("size-5");

            displayKey.push("5");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-5 Unchecked");
        displayKey=displayKey.filter(x=> (x!="5"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}



function size2Filter()
{
    

    if(document.getElementById("size2").checked)
       { 
            alert("size-6");

            displayKey.push("6");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-6 Unchecked");
        displayKey=displayKey.filter(x=> (x!="6"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}



function size3Filter()
{
    

    if(document.getElementById("size3").checked)
       { 
            alert("size-7");

            displayKey.push("7");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-7 Unchecked");
        displayKey=displayKey.filter(x=> (x!="7"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}



function size4Filter()
{
    

    if(document.getElementById("size4").checked)
       { 
            alert("size-8");

            displayKey.push("8");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-8 Unchecked");
        displayKey=displayKey.filter(x=> (x!="8"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}



function size5Filter()
{
    

    if(document.getElementById("size5").checked)
       { 
            alert("size-9");

            displayKey.push("9");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-9 Unchecked");
        displayKey=displayKey.filter(x=> (x!="9"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}



function size6Filter()
{
    

    if(document.getElementById("size6").checked)
       { 
            alert("size-10");

            displayKey.push("10");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-10 Unchecked");
        displayKey=displayKey.filter(x=> (x!="10"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}




function size7Filter()
{
    

    if(document.getElementById("size7").checked)
       { 
            alert("size-11");

            displayKey.push("11");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-11 Unchecked");
        displayKey=displayKey.filter(x=> (x!="11"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}




function color1Filter()
{
    

    if(document.getElementById("color1").checked)
       { 
            alert("size-11");

            displayKey.push("11");

   console.log(displayKey)
    // showProducts(footwearData)

       }

    else{
        
        alert("size-11 Unchecked");
        displayKey=displayKey.filter(x=> (x!="11"))
     
    // showProducts(displayFromFilter)
   console.log(displayKey)
    }


}

