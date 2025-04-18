let title = document.getElementById("title")
let image = document.getElementById("image");
let price = document.getElementById("price")
let categoryval = document.querySelector("#select")
let showdata = document.querySelector("#table tbody")
let offcanvas = document.querySelector("#table-offcanvas tbody")
let btn = document.querySelector(".formBtn")
let form = document.getElementById("form")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let productList = JSON.parse(localStorage.getItem("productList")) || [];
let editId = -1
title.focus()



form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let category = [];
    for(let i=0;i<categoryval.length;i++){
        if(categoryval[i].selected){
            category.push(categoryval[i].value)
        }
    }

    let obj = {
        title:title.value,
        image: image.value.trim() || "https://via.placeholder.com/50",
        price:price.value,
        categoryval:category,
    }

    if(editId === -1){
        cart.push(obj)
    }
    else
    {
        cart[editId] = obj;
        editId = -1;
    }

    localStorage.setItem("cart",JSON.stringify(cart))

    title.value = '';
    price.value = '';
    image.value = '';
    categoryval.value = '';
    btn.innerText = 'submit'
    btn.classList.add("btn-primary")
    btn.classList.remove("btn-Success")
    title.focus()

    addProducts()
   
})

const addProducts =()=>{
    showdata.innerHTML = '';
    cart.forEach((item,index)=>{
        let row = document.createElement("tr")
        row.innerHTML =
        `
           <td>${index+1}</td>
          <td>${item.title}</td>
          <td><img src="${item.image}" alt="Product Image" width="50" height="50" style="object-fit: cover;"></td>
          <td>${item.price}</td>
          <td>${item.categoryval}</td>
          <td>
              <button onclick="editProduct(${index})" class="btn btn-warning">Edit</button>
              <button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button>
              <button onclick="addProductToList(${index})" class="btn btn-success">Add to cart</button>
           </td>

        `;

        showdata.append(row)

    })
}

addProducts()

const deleteProduct=(index)=>{
    cart.splice(index,1)
    localStorage.setItem("cart",JSON.stringify(cart))
    addProducts();
}

const editProduct =(index)=>{
     editId = index
     let info = cart[index]
     title.value = info.title;
     image.value = info.image;
     price.value = info.price;
     btn.innerText = 'update'
     btn.classList.add("btn-success")
     btn.classList.remove("btn-primary")


}


const  addProductToList= (index)=>{
    let info = cart[index];
    productList.push(info);
    localStorage.setItem("productList",JSON.stringify(productList))
    console.log(productList)
    displayInCart()
}

const displayInCart=()=>{
    offcanvas.innerHTML = '';
    productList.forEach((product,index)=>{
        let offrow = document.createElement("tr")
        offrow.innerHTML =
        `<td>${index+1}</td>
        <td>${product.title}</td>
        <td><img src="${product.image}" alt="Product Image" width="50" height="50" style="object-fit: cover;"></td>
        <td>${product.price}</td>
        <td>${product.categoryval}</td>
        <td><button onclick = "deleteCartItem(${index})" class="btn btn-danger">Delete</button>
  
        `;

        offcanvas.append(offrow);
    })
}

displayInCart();

const deleteCartItem = (index)=>{
    productList.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productList));
    displayInCart();
}

