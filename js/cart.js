//====== ADD TO CART =====///

//Constructor for the PRODUCTS objects
function Product(name, type, weight, price, picture) {
    this.name = name;
    this.type = type;
    this.weight = weight;
    this.price = price;
    this.picture = picture;
}

let cart = []; //empty cart array
let total = 0; //empty total
var productList = {}; //empty array

//Product objects
var product1 = new Product(
    "Vanilla Sky",
    "Protein Shake",
    "1kg",
    499,
    "images/product_hero.jpg",
);
productList['product1'] = product1;


//The onclick function that will add product object to cart and update total.
function addToCart(value) {

    let targetProduct = productList[value];
    
    cart.push(targetProduct);
    sessionStorage.setItem("cart", JSON.stringify(cart));
        
    total += targetProduct.price;
    
    alert(`
    Item has been added to cart. 
    Total: R${total}`
    )
            
}

//====== CALCULATE CART FUNCTIONS========//

//ONLOAD function that checks sessionStorage for any objects in the cart.
//if cart has objects, they are inputted into the HTML on a loop.
function onLoad() {
    
    if (sessionStorage.getItem("cart") == null) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    } else {
        calculateTotal();
        cart = JSON.parse(sessionStorage.getItem("cart"));
        let basket = document.getElementById("basket");
        cart.forEach(function(product, i) {
            basket.innerHTML += `
            <div id="${product.name}" class="basket-product">
              <div class="item">
    
                <div class="product-image">
                  <img src="../${product.picture}" alt="Placholder Image 2" class="product-frame">
                </div>
    
                <div class="product-details">
                  <h1><strong>${product.type}</strong></h1>
                  <p><strong>${product.name}</strong></p>
                  <p>${product.weight}</p>
                </div>
    
              </div>
    
              <div class="price">${product.price}</div>
    
              <div class="quantity">
                <input type="number" value="1" min="1" class="quantity-field">
              </div>
    
              <div class="subtotal">${product.price}</div>
    
              <div class="remove">
                <button onclick="removeItem('${product.name}')">Remove</button>
              </div>
    
            </div>                
            `;


        }); 
    }

    updateDisplay();
    
}

//Update the display
function updateDisplay() {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    let mainSelect = document.getElementById("main");
    let emptySelect = document.getElementById("emptyCart")
    if (cart != null && cart.length > 0) {
        mainSelect.style.display = "block";
        emptySelect.style.display = "none";
    } else {
        mainSelect.style.display = "none";
        emptySelect.style.display = "block";
    }
}

//Remove objects from the sessionStorage
function removeItem(productName) {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    cart.splice(cart.findIndex(product => product.name === productName), 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    const target = document.getElementById('basket');
    target.removeChild(document.getElementById(productName));
    updateDisplay();
}

//CART SUBTOTAL
function cartSubTotal() {
    var cartSubTotal = 0
    cart = JSON.parse(sessionStorage.getItem("cart"));
    cart.forEach(product => {
        cartSubTotal += product.price;
    });
    
    var divObj = document.getElementById('basket-subtotal');
    divObj.innerHTML = cartSubTotal;

    return cartSubTotal;
}

//PROMO CODE Function
function promoDiscount() {

    var promoDiscount=0;
    var theForm = document.forms["promoForm"];
    var includePromo = theForm.elements["promo-code"];
    if(includePromo.value.length > 0) {
        promoDiscount = -100;
    }
        
    var vatDiv = document.getElementById('promo-div');
    vatDiv.style.display = 'block';

    var divobj = document.getElementById('basket-promo');
    divobj.style.display='block';
    divobj.innerHTML = promoDiscount;

    return promoDiscount;


}

//DELIVERY FUNCTIONS
//Delivery prices array
var deliveryPrices = new Array();
deliveryPrices["None"] = 0;
deliveryPrices["Collection"] = 0;
deliveryPrices["PostNet"] = 40;
deliveryPrices["ExpressMail"] = 80;

//Function to get selected delievery price option
function getDeliveryPrice() {

    var deliveryPrice = 0;
    var deliveryForm = document.forms["deliveryForm"];
    var selectedDelivery = deliveryForm.elements["delieverySelect"];
     
    deliveryPrice = deliveryPrices[selectedDelivery.value];

    return deliveryPrice;
    
}

//CALCULATE VAT FUNCTIONS
function calculateVAT(){
    var subTotal = cartSubTotal() + promoDiscount();
    var vatTotal = Number((subTotal * 0.15).toFixed(2));
   
    //display VAT result in summary
    var divobj = document.getElementById('basket-vat');
    divobj.innerHTML = vatTotal;

    //finally we return vat
    return vatTotal;
}


//CALCULATE TOTAL Dynamic function
function calculateTotal()
{
    var totalPrice = (cartSubTotal() + promoDiscount()) + calculateVAT() + getDeliveryPrice();
    
    var divobj = document.getElementById('basket-total');
    divobj.style.display='block';
    divobj.innerHTML = totalPrice;

}

//Go to secure CECKOUT function
function checkout(){
    alert(`
    Your order has been confirmed!
    Reference number: ${generateReference()}
    `)
}


function generateReference() {
    return 'WAZ' + Math.round((Math.random() * 1000));
}














