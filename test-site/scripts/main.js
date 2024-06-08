

document.addEventListener('DOMContentLoaded',()=>{
  var datalist = ["大麥克","薯條","可樂","雞塊","蘋果派","冰淇淋","薯餅","炸雞"];
  var btn = document.getElementById('btn');
  const addToCalButton = document.getElementById('add-to-cal');
  const calItemCount = document.querySelector('.cal-icon span');
  const cartItemsList = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const calIcon = document.querySelector('.cal-icon');
  const sidebar = document.getElementById('sidebar');

  let cartItems = [];
  let totalAmount = 0;

  // Add items to the dropdown list
  const dropdownMenuButton = document.getElementById('dropdownMenuButton1');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
      item.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default action
          dropdownMenuButton.textContent = event.target.textContent; // Update button text
          updateCartPrices(event.target.textContent);
      });
  });

  btn.addEventListener('click',function(){
    //if placehold is not empty change index.html to index2.html 
    var placehold = document.getElementById('placehold').value;
    var table = document.getElementById('product_list');
    var rows = table.getElementsByTagName('tr');
    var add_to_cal = document.getElementById('add-to-cal');
    if(placehold != ""){
      for (var i = 0; i < th.length; i++) {
        th[i].style.display = '';
      }
      // Filter table rows
      for (var i = 1; i < rows.length; i++) {
        var firstColumnText = rows[i].getElementsByTagName('td')[0].innerText;
        if (firstColumnText.indexOf(placehold) === -1) {
          rows[i].style.display = 'none';
        } else {
          rows[i].style.display = '';
        }
      }
      //if placehold is '薯條' then change img's src to 'images/fries.jpg'
      switch(placehold){
        case '大麥克':{
          document.getElementById('imge').src = 'images/bigmac.jfif';
          break;
        }
        case '薯條':{
          document.getElementById('imge').src = 'images/fries.jfif';
          break;
        }
        case '可樂':{
          document.getElementById('imge').src = 'images/cola.jfif';
          break;
        }
        case '麥香雞':{
          document.getElementById('imge').src = 'images/mchicken.jfif';
          break;
        }
      }
      add_to_cal.style.display = '';
    }
  });
  var sidebarClose = document.getElementById("sidebar-close");
  // Function to toggle the sidebar
  function toggleSidebar() {
    sidebar.classList.toggle("open");
  }

  // Add event listener to the close icon and the calculator icon to toggle the sidebar
  sidebarClose.addEventListener("click", toggleSidebar);
  calIcon.addEventListener("click", toggleSidebar); // Assuming cal-icon should also toggle the sidebar
  
  
  // Add event listener to the add to cal button
  addToCalButton.addEventListener("click", () => {
    const itemName = document.getElementById("placehold").value;
    const countryName = dropdownMenuButton.textContent;
    const table = document.getElementById("product_list");
    const rows = table.getElementsByTagName("tr");
                  
    let price = 0;
    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].getElementsByTagName("td");
      if (cols[0].textContent === itemName && cols[1].textContent === countryName) {
        price = parseInt(cols[2].textContent, 10);
        break;
        }
    }
    // Add item to cart
    const item = {
      name: document.getElementById("placehold").value,
      country: countryName,
      price: price,
      quantity: 1,
    };

    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push(item);
    }

    totalAmount += item.price;

    updateCartUI();
  });

    function updateCartUI() {
      updateCartItemCount(cartItems.length);
      updateCartItemList();
      updateCartTotal();
    }

    function updateCartItemCount(count) {
      calItemCount.textContent = count;
    }

    function updateCartItemList(){
      cartItemsList.innerHTML = '';
      cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add("cart-item", 'individual-cart-item');
        cartItem.innerHTML = `
        <span>(${item.quantity}x)${item.name}</span>
        <span class="cart-item-price">$${item.price*item.quantity.toFixed(2,)}
        <button class="remove-item" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
        </span>
        `;
        cartItemsList.appendChild(cartItem);
      });
      
      const removeButtons = document.querySelectorAll(".remove-item");
      removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const index = event.target.dataset.index;
          removeItemFromCart(index);
        });
      });
    }  

    function removeItemFromCart(index){
      const removedItem = cartItems.splice(index, 1)[0];
      totalAmount -= removedItem.price * removedItem.quantity;
      updateCartUI();
    }

    function updateCartTotal(){
      cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }
    // Update cart prices based on selected country
    function updateCartPrices(selectedCountry) {
      cartItems.forEach(item => {
          const table = document.getElementById("product_list");
          const rows = table.getElementsByTagName("tr");
          
          for (let i = 1; i < rows.length; i++) {
              const cols = rows[i].getElementsByTagName("td");
              if (cols[0].textContent === item.name && cols[1].textContent === selectedCountry) {
                  item.price = parseInt(cols[2].textContent, 10);
                  break;
              }
          }
      });
      
        totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        updateCartUI();
      }
  
});