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

$(document).ready(function () {
  displayPage(products);
  displayTable();
  $("body").on("click", "#submit", function () {
    console.log("Cicked to Search");
    var searchItem = $("#search").val();
    console.log(searchItem);
    searchItemFunction(searchItem, products);
  });

  $("body").on("click", ".delete", function () {
    console.log("Entered the delete function");
    var delId = $(this).data("id");
    delFunction(delId, products);
    console.log("ID to delete is " + delId);
  });

  $("body").on("click", "#osDrop", function () {
    console.log("Clicked on Os dropdown");
    filterOs(products);
  });

  $("body").on("click", "#brandDrop", function () {
    console.log("Clicked on Brand dropdown");
    var test = $("#osDrop").value();
    console.log(test);
  });
});

function searchItemFunction(searchItem, products) {
  console.log(products);
  for (i = 0; i < products.length; i++) {
    if (searchItem == products[i].id || searchItem === products[i].name){
      console.log("Item found");
      filter.push(products[i]);
      console.log(filter);
      displaySearch(filter);
      break;
    }else{
        console.log("Item not found");
    }
  }
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
                    <td>\
                    <a href='#' class='delete' data-id=" +
      filter[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  search += "</table>";
  console.log(search);
  $("#content").html(search);
  $("#content").show();
  filter.splice(0, filter.length);
}

//display filter

function filterOs(products) {
  console.log(products.brand);
}

function displayPage(products) {
  var osDrop =
    "<select id='osDrop'>\
            <option id='osAll' value='All'>All</option>\
            <option id='iOS' value='iOS'>iOS</option>\
            <option id='android' value='Android'>Android</option>\
            <option id='windows' value='Windows'>Windows</option>\
            </select>";
  var brandDrop =
    "<select id='brandDrop'>\
                <option id=brandAll value='All'>All</option>\
                <option data-brand='samsung' value='Samsung'>Samsung</option>\
                <option data-brand='apple' value='Apple'>Apple</option>\
                <option data-brand='motorola' value='Motorola'>Motorola</option>\
                <option data-brand='asus' value='Asus'>Asus</option>\
                <option data-brand='microsoft' value='Microsoft'>Microsoft</option>\
            </select>";

  var search = "<input id='search' type='text' placeholder='Search..'>";
  var submit =
    "<input \
                type='button'\
                id='submit'\
                class='input'\
                value='submit'>";

  filterdrop();
  $("#header").before(osDrop);
  $("#header").before(brandDrop);
  $("#header").before(search);
  $("#header").before(submit);
}

function delFunction(delId, products) {
  let text = "Do you really want to delete the product!\nPress ok to delete";
  if (confirm(text) == true) {
    for (i = 0; i < products.length; i++) {
      if (products[i].id == delId) {
        console.log("Value of index is " + i);
        var index = i;
      }
    }
    products.splice(index, 1);
    displayTable(products);
  }
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
      products[i].brand +
      "</td>\
                    <td>\
                    <a href='#' class='delete' data-id=" +
      products[i].id +
      ">Delete</a>\
                    </td>\
                </tr>";
  }
  html += "</table>";
  $("#content").html(html);
  $("#content").css("width", "100%");
}

function filterdrop() {
  $("#osDrop").css({
    "background-color": "#4CAF50",
    "color": "white",
    "padding": "16px",
    "font-size": "16px",
    "border": "none",
    "cursor": "pointer",
  });
  $("#brandDrop").css({
    "background-color": "#4CAF50",
    "color": "white",
    "padding": "16px",
    "font-size": "16px",
    "border": "none",
    "cursor": "pointer",
  });
}
