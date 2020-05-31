

var nameInput=document.getElementById("productName");
var companyInput=document.getElementById("productCompany");
var priceInput=document.getElementById("productPrice");
var descInput=document.getElementById("productDesc");

var addBtn = document.getElementById("addBtn");

var inputs=document.getElementsByClassName("form-control");

var productsContainer;



if(localStorage.getItem("productsList")==null){
  productsContainer=[];
}

else{
  productsContainer=JSON.parse(localStorage.getItem("productsList"));
  displayData();
}





addBtn.onclick = function(){


      
 addProduct();
 displayData();
 clearForm()
  
}


function addProduct(){
  if(nameInput.value!=""&&companyInput.value!=""&&priceInput.value!=""&&descInput.value!="")
  {
    var product={
      productName:nameInput.value,
      productCompany:companyInput.value,
      productPrice:priceInput.value,
      productDesc:descInput.value,
    }
     
    productsContainer.push(product);

    localStorage.setItem("productsList",JSON.stringify(productsContainer))
  
  }
  else{
    alert("all fields are empty")
  }

 
  
}

function displayData(){
  var trs="";
  for(var i=0;i<productsContainer.length;i++){
    trs+="<tr><td>"+productsContainer[i].productName+"</td><td>"+productsContainer[i].productCompany+"</td><td>"+productsContainer[i].productPrice+"</td><td>"+productsContainer[i].productDesc+"</td><td><button onclick='deleteProduct("+i+")' class='btn btn-danger'>delete</button></td></tr>"
  }

  document.getElementById("tableBody").innerHTML=trs
}

function clearForm(){
  for(var i=0;i<inputs.length;i++){
    inputs[i].value=""
  }

}
function deleteProduct(index){
  productsContainer.splice(index,1);
  localStorage.setItem("productsList",JSON.stringify(productsContainer))
  displayData();
}


// js Dom --> document object Model
/*
var x=document.getElementById("demo");
var x=document.getElementsByClassName("test");
var x=document.getElementsByTagName("h3");
var x=document.getElementsByTagNameNS("h1");
var x=document.getElementsByName("fname");

var x=document.querySelector(".test");
var x=document.querySelectorAll(".test");
var h1s=document.getElementsByClassName("test");


for(var i=0;i<h1s.length;i++){
   h1s[i].addEventListener("click",function(){
     alert("hjdjhjhdjh")
   })
}

//set attribute. to element

var img=document.getElementById("myImg");
var link=document.getElementById("myLink")
var test1=document.querySelector(".test1")
link.href="https://www.google.com/?hl=ar"
img.src="images/01-thumbnail.jpg";

*/

var imgs=document.getElementsByClassName("img-fluid");
var overlayCont=document.querySelector(".overlay-container");
var overlayInner=document.querySelector(".overlay-inner");
var imgsArray=[];
var wClose=document.getElementById("wClose");
var next=document.getElementById("next");
var prev=document.getElementById("prev");

var currentIndex=0;
for(var i=0;i<imgs.length;i++){

 imgsArray.push(imgs[i]);
  imgs[i].addEventListener("click",function(e){
    overlayCont.classList.add("show");
    var imgSrc=e.target.src;
    currentIndex=imgsArray.indexOf(e.target);
   
    overlayInner.style.backgroundImage="url("+imgSrc+")";

      
  })
}
next.addEventListener("click",function(){
  getNextImg()
})
function getNextImg(){
  currentIndex++;
  if(currentIndex>imgsArray.length-1){
    currentIndex=0
  }
  overlayInner.style.backgroundImage="url("+imgsArray[currentIndex].src+")";

}

prev.addEventListener("click",function(){
 getPrevImg()
})
function getPrevImg(){
  currentIndex--;

  if(currentIndex<0){
    currentIndex=imgsArray.length-1
  }
   overlayInner.style.backgroundImage="url("+imgsArray[currentIndex].src+")";
 
}

wClose.addEventListener("click",function(){
  overlayCont.classList.remove("show");
})

document.addEventListener("keydown",function(e){
  if(e.keyCode==27){
    overlayCont.classList.remove("show");
  }
  else if(e.keyCode==39){
    getNextImg();
  }
  else if(e.keyCode==37){
    getPrevImg()
  }
  
})