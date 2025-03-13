const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    choosenProduct = products[index];
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButtons = document.querySelectorAll(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

const cart = [];
const cartTotal = document.querySelector(".cartTotal");

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cart.push(choosenProduct);
    updateCartTotal();
    payment.style.display = "flex";
  });
});

function updateCartTotal() {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  cartTotal.textContent = "Total: $" + total;
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex(product => product.id === productId);
  if (productIndex > -1) {
    cart.splice(productIndex, 1);
    updateCartTotal();
  }
}

close.addEventListener("click", () => {
  payment.style.display = "none";
});

const checkoutButton = document.querySelector(".checkoutButton");

checkoutButton.addEventListener("click", () => {
  const name = document.querySelector(".payInput[name='name']").value;
  const phone = document.querySelector(".payInput[name='phone']").value;
  const address = document.querySelector(".payInput[name='address']").value;

  if (!name || !phone || !address) {
    alert("Please fill in all fields.");
    return;
  }
  
  const cartDetails = cart.map(product => `${product.title}: $${product.price}`).join('\n');
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  
  // Create a text file with the checkout details
  const details = `Your Cart:\n${cartDetails}\n\nTotal: $${total}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
  const blob = new Blob([details], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'checkout_details.txt';
  link.click();
});
