//jQuery
var products = [
  {
    id: "100",
    name: "iPhone 4S",
    brand: "Apple",
    os: "iOS",
  },
  {
    id: "101",
    name: "Moto X",
    brand: "Motorola",
    os: "Android",
  },
  {
    id: "102",
    name: "iPhone 6",
    brand: "Apple",
    os: "iOS",
  },
  {
    id: "103",
    name: "Samsung Galaxy S",
    brand: "Samsung",
    os: "Android",
  },
  {
    id: "104",
    name: "Google Nexus",
    brand: "ASUS",
    os: "Android",
  },
  {
    id: "105",
    name: "Surface",
    brand: "Microsoft",
    os: "Windows",
  },
];
var filter = [];
var osArray=[];
var filterArray=[];
var filterOsVal=0;
var filterBrandVal=0;
$(document).ready(function () {
  displayPage(products);
  displayTable();
  $("body").on("click", "#submit", function () {
    console.log("Cicked to Search");
    var searchItem = $("#search").val();
    console.log(searchItem);
    searchItemFunction(searchItem, products);
  });

  $("body").on("click",".delete",function(){
    $(this).parent().hide();
  });

  $("body").on("click", "#osDrop", function(){
    console.log("Clicked on Os dropdown");
    console.log("filBrandVal value is "+filterBrandVal);
    var filOs=$("#osDrop").find('option:selected').val();
    //var filOs=$(this).data("os");
    if(filOs!="All"){
      console.log("Os filter value is not all");
      filterOsVal=filOs;
      filterProducts(filterOsVal,filterBrandVal,products);
    }else{
      displayTable();
      filterOsVal=0;
    }
  });

  $("body").on("click", "#brandDrop", function(){
    console.log("Clicked on Brand dropdown");
    console.log("filOs value is "+filterOsVal);
    //var filBrand= $(this).data("brand");
    var filBrand=$("#brandDrop").find('option:selected').val();
    if(filBrand!="All"){
      console.log("Brand filter value is not all")
        filterBrandVal=filBrand;
        filterProducts(filterOsVal,filterBrandVal,products);
    }else{
      displayTable();
      filterBrandVal=0;
    }
  });
});




function filterProducts(filterOsVal,filterBrandVal,products){
var error=0;
for(i=0;i<products.length;i++){
  if(filterOsVal==products[i].os && filterBrandVal==0){
    console.log("Os matched");
    filterArray.push(products[i]);
  }
}
for(i=0;i<products.length;i++){
  if(filterBrandVal==products[i].brand && filterOsVal==0){
    console.log("Brand matched");
    filterArray.push(products[i]);
  }
}

for(i=0;i<products.length;i++){
  if(filterBrandVal!=0 && filterOsVal!=0){
    console.log("You have entered the mix filter");
    if(filterBrandVal==products[i].brand && filterOsVal==products[i].os){
      console.log("Mix filtered match");
      filterArray.push(products[i]);
    }else{
      console.log("No mix item found");
      displayError();
    }
  }
}
console.log("filtered array is "+ filterArray);
displayFilter(filterArray);
}

function displayFilter(filterArray){
  var filterItem = "";
  filterItem=
    "<table>\
    <tr><th>Product ID</th>\
    <th> Product Name</th>\
    <th>Brand</th><th>Operating system</th><th>Remove</th>\
    </tr>";
  for (i = 0; i < filterArray.length; i++) {
    filterItem+=
      "<tr>\
                    <td>" +
      filterArray[i].id +
      "</td>\
                    <td>" +
      filterArray[i].name +
      "</td>\
                    <td>" +
      filterArray[i].brand +
      "</td>\
                    <td>" +
      filterArray[i].os +
      "</td>\
                    <td  class='delete'>\
                    <a href='#' data-id=" +
      filterArray[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  filterItem+= "</table>";
  $("#content").html(filterItem);
  style();
  filterArray.splice(0, filterArray.length);
  console.log(filterArray)
}


function searchItemFunction(searchItem, products) {
  console.log(products);
  if (searchItem.length===0){
    displayTable();
  }else for (i = 0; i < products.length; i++) {
    if (searchItem == products[i].id || searchItem === products[i].name){
      console.log("Item found");
      filter.push(products[i]);
      console.log(filter);
      displaySearch(filter);
      break;
  }else{
        displayError();
        console.log("404 Item not found");
    }
  }
}

function displayError(){
$("#content").html("Error 404");
}

function displaySearch(filter) {
  console.log("Displaying searched item");
  console.log("Array to show is " + filter);
  var search = "";
  search =
    "<table>\
    <tr><th>Product ID</th>\
    <th> Product Name</th>\
    <th>Brand</th><th>Operating system</th><th>Remove</th>\
    </tr>";
  for (i = 0; i < filter.length; i++) {
    search +=
      "<tr>\
                    <td>" +
      filter[i].id +
      "</td>\
                    <td>" +
      filter[i].name +
      "</td>\
                    <td>" +
      filter[i].brand +
      "</td>\
                    <td>" +
      filter[i].os +
      "</td>\
                    <td class='delete'>\
                    <a href='#'  data-id=" +
      filter[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  search += "</table>";
  console.log(search);
  $("#content").html(search);
  style();
  filter.splice(0, filter.length);
}


function displayPage(products) {
  var osDrop ="<select id='osDrop'>\
                  <option class='osDropList' value='All'>All</option>\
                  <option class='osDropList' data-os ='i'>iOS</option>\
                  <option class='osDropList' data-os ='i'>Android</option>\
                  <option class='osDropList' data-os ='i'>Windows</option>\
            </select>";
  

  var brandDrop="<select id='brandDrop'>\
                   <option class='brandDropList' value='All'>All</option>"
      for(i=0;i<products.length;i++){
          brandDrop +="<option class ='brandDropList' data-brand="+products[i].brand+">"+products[i].brand+"</option>";
        }
    brandDrop+="</select>";

  var search = "<input id='search' type='text' placeholder='Search..'>";
  var submit =
    "<input \
                type='button'\
                id='submit'\
                class='input'\
                value='submit'>";
  
  $("#header").before(osDrop);
  $("#header").before(brandDrop);
  $("#header").before(search);
  $("#header").before(submit);
  $("table").css("width","100%");
}


function displayTable() {
  var html = " ";
  html +=
    "<table><tr><th>Product ID</th><th> Product Name</th><th>Brand</th><th>Operating system</th><th>Remove</th></tr>";
  for (i = 0; i < products.length; i++) {
    html +=
      "<tr>\
                    <td>" +
      products[i].id +
      "</td>\
                    <td>" +
      products[i].name +
      "</td>\
                    <td>" +
      products[i].brand +
      "</td>\
                    <td>" +
      products[i].os +
      "</td>\
                    <td  class='delete'>\
                    <a href='#' data-id=" +
      products[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  html += "</table>";
  $("#content").html(html);
  style();
 
 
}

function style(){
  $("table").css("width", "100%");
  $("tr").css("background-color", "cyan");
  $("td").css({"text-align":"centre",
  "background-color": "aliceblue",
  "align-content":"centre"});

  $(".osDropList").css("background-color","aliceblue");
  $(".brandDropList").css("background-color","aliceblue");


  $("#search").css({
    "font-size": "16px",
    "border-color": "black",
    "cursor": "pointer",
    "float":"right",
  });
 
  $("#submit").css({"background-color": "gold",
  "color": "black",
  "font-size": "16px",
  "border-color": "black",
  "cursor": "pointer",
  "margin-right":"5px",
  "margin-left":"5px",
  "float":"right",
  });


  $("#osDrop").css({
    "background-color": "cyan",
    "color": "black",
    "font-size": "16px",
    "border-color": "black",
    "cursor": "pointer",
    "margin-left":"20px",
  });


  $("#brandDrop").css({
    "background-color": "cyan",
    "color": "black",
    "font-size": "16px",
    "border-color": "black",
    "cursor": "pointer",
    "margin-right":"20px",
    "margin-left":"5px",
  });
}
