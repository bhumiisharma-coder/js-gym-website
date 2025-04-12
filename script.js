let register = document.getElementById("offcanvas-register");
let login = document.getElementById("offcanvas-login");
let registerbtn = document.getElementById("register-btn"); 
let loginbtn = document.getElementById("login-btn");
let offbody = document.getElementById("offbody");
register.style.display= "none"

  // Get saved data from localStorage
const storedData = localStorage.getItem("username") ;


  let updateSubtotal = 0;
  function calculateSubtotal() {
    updateSubtotal = 0;
    product.forEach((element, index) => {
      let price2 = parseFloat(element.price2.replace(/[^0-9.]/g, "")) || 0;
      let count_number2 = parseInt(element.count_number) || 1;
      updateSubtotal += price2 * count_number2;
    });
    // Update the subtotal display
    const subtotalElement = document.querySelector(".subtotal-display");
    if (subtotalElement) {
      subtotalElement.textContent = `Subtotal: ${updateSubtotal.toFixed(2)}`;
    }
  }


  function plus2(index) {
    let countElement = document.getElementById(`countn-${index}`);
    let count_number2 = parseInt(countElement.innerText);
    count_number2++;
    countElement.innerText = count_number2;
    product[index].count_number = count_number2; // Update quantity in array

    // Convert price2 to a number:
    let price2 = parseFloat( product[index].price2.replace(/[^0-9.]/g, "")) || 0;
    document.querySelector(`.total-${index}`).textContent = (price2 * count_number2).toFixed(2);
 

    calculateSubtotal();

     
}

function subs2(index) {
    let countElement = document.getElementById(`countn-${index}`);
    let count_number2 = parseInt(countElement.innerText);
    if (count_number2 > 1) {
        count_number2--;
        countElement.innerText = count_number2;
        product[index].count_number = count_number2; // Update quantity in array

        // Convert price2 to a number:
        let price2 = parseFloat( product[index].price2.replace(/[^0-9.]/g, "")) || 0;
        document.querySelector(`.total-${index}`).textContent = (price2 * count_number2).toFixed(2);
     
        
        calculateSubtotal();
    }
}

const product = JSON.parse(storedData) || [];

  function addtocard(){
    if (storedData) {
   
      console.log("Fetched from localStorage:", product);


     product.forEach((element,index)=>{
      let price = parseFloat(element.price2.replace(/[^0-9.]/g, "")) || 0; // Extract number, default to 0 if invalid
      let quantity = parseInt(element.count_number) || 1; // Ensure quantity is a valid number, default to 1
        let itemTotal = price * quantity; // Calculate total price
     calculateSubtotal()
      console.log(element.images)
      let divs = document.createElement("div")
      divs.innerHTML = 
      `
      <img src = "${element.images}" height="100px" width = "100px"></img>
        <span onclick = "deletei(${index})" ><i class="fa-solid fa-xmark"></i></span> 
      <h1 class="fs-6"> ${element.title} </h1>
       <div class="d-flex  gap-3">
          <del>  <p>${element.price1}</p> </del>
       <p>${element.price2}</p>
          </div>
        <table class="table">
                            <tr>
                                <td onclick="subs2(${index})" > -</td>
                                 <td id="countn-${index}"> ${element.count_number} </td>
                                  <td  onclick="plus2(${index})"> + </td>
                              
                                   
                            </tr>
                                 </table>
                   <h1 class=" total-${index} text-capitalize fs-5"> total:  ${itemTotal}<h1>
  
        
      `
      offbody.appendChild(divs);

      
       
  
  
     })
  } else {
      console.log("No data found in localStorage");
  }

  if( product.length==0){
    shoppingcart.innerHTML= `
      <i class="fa-solid fa-cart-shopping fs-1 d-flex justify-content-center"></i>
    <h1 class="text-capitalize mt-5"> your cart is empy </h1>`
}
else{
offbody.innerHTML += `
<div style="margin-top: 30px;">
<p>Special instructions for seller:</p>
<input class="w-100 h-5" placeholder="Enter instructions" />
<h1 class="subtotal-display">Subtotal: ${updateSubtotal.toFixed(2)}</h1>
</div>



`;
}
  }

  
  


registerbtn.addEventListener("click",()=>{
        register.style.display = "block" 
        login.style.display = "none"
})

loginbtn.addEventListener("click",()=>{
         register.style.display = "none"
         login.style.display = "block"
})


let login_file = document.getElementById("login-file");
 login_file.addEventListener("click",()=>{
       window.location.href = "login.html"
 })


  
 // Fetch data for both sliders
async function fetchData() {
  try {
    // Fetch data for both sliders simultaneously
    const [newProductsResponse, featuredProductsResponse] = await Promise.all([
      fetch("http://localhost:3000/products"),
      fetch("http://localhost:3000/products2")
    ]);
    
    const newProducts = await newProductsResponse.json();
    const featuredProducts = await featuredProductsResponse.json();
    
    // Initialize both sliders
    initializeSlider(newProducts, "responsives", "New Products");
    initializeSlider(featuredProducts, "featuredProductsSlider", "Store Specials");
    
  } catch (error) {
    console.error('Error fetching data:', error);
    // Fallback data if API fails
    const fallbackNewProducts = [
      {
        id: 1,
        image: "./public/imges/fallback1.jpg",
        "product-title": "New Treadmill",
        price: "$999",
        price2: "$1199"
      }
    ];
    
    const fallbackFeaturedProducts = [
      {
        id: 101,
        image: "./public/imges/fallback2.jpg",
        "product-title": "Special Dumbbell Set",
        price: "$199",
        price2: "$249"
      }
    ];
    
    initializeSlider(fallbackNewProducts, "responsives", "New Products");
    initializeSlider(fallbackFeaturedProducts, "featuredProductsSlider", "Store Specials");
  }
}

// Initialize slider with data
function initializeSlider(data, sliderId, sectionTitle) {
  const slider = document.getElementById(sliderId);
  slider.innerHTML = ''; // Clear existing content
  
  data.forEach(element => {
    const cart = document.createElement("div");
    cart.classList.add("product-card");
    
    
    cart.innerHTML = `
      <a href="details.html?image=${encodeURIComponent(element.image)}
          &title=${encodeURIComponent(element['product-title'])}
          &price1=${encodeURIComponent(element.price)}
          &price2=${encodeURIComponent(element.price2)}
          &ids=${encodeURIComponent(element.id)}" class="anchor">
          <div class="card-body">
              <div class="product-image-container">
                  <img src="${element.image}" alt="${element['product-title']}" class="product-image">
               
              </div>
                 <span class="sale"> ${element.onsale} </span>
                
              <h5 class="product-title">${element['product-title']}</h5>
             <div class="price">
                <del>${element.price}</del>
                <span class="discount">${element.price2}</span>
              </div>
              <button class="add-to-cart">
                  <i class="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
          </div>
      </a>
    `;
    
    slider.appendChild(cart);
  });
  
  // Initialize Slick slider
  $(`#${sliderId}`).slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

// Initialize when document is ready
$(document).ready(function() {
  fetchData();
  
  // Initialize other sliders
  $('.your-class').slick();
  $('.your-class2').slick();
});