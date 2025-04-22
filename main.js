const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productCategory = document.getElementById('productCategory')
const productDescription = document.getElementById('productDescription')
const searchInput = document.getElementById('searchInput')
const addBtn = document.getElementById('addBtn')
const updateBtn = document.getElementById('updateBtn')
let indexUpdate = 0;

let productContainer =[];
if(localStorage.getItem('products')!=null){
    productContainer = JSON.parse(localStorage.getItem("products"))
    displayProduct()
}

// addProduct
function addProduct(){
    if (!validateForm()) return;

    const product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value,
    };
    productContainer.push(product);
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayProduct();
    clearForm();
}


// displayProduct
function displayProduct(){
    let container ="";
    for(let i=0 ; i<productContainer.length ; i++){
container+=`    <tr>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td>
                <button class="btn btn-outline-info" onclick="setData(${i})">Update</button>
                <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
            </td>
          </tr>`
    }
    document.getElementById('tableData').innerHTML = container;
}

// deleteProduct
function deleteProduct(elementNumber){
productContainer.splice(elementNumber,1)
localStorage.setItem('products',JSON.stringify(productContainer))
displayProduct()

}


// searchProduct
function searchProduct(){
    let term = searchInput.value;
    let container ="";
    for(let i=0 ; i<productContainer.length ; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){

            container+=`    <tr>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td>
                <button class="btn btn-outline-info">Update</button>
                <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button>
            </td>
          </tr>`
    }
    document.getElementById('tableData').innerHTML = container;
        }
    }

    // setData
    function setData(index){
        indexUpdate = index ;
       let currentProduct = productContainer[index]
       productName.value = currentProduct.name;
       productPrice.value = currentProduct.price;
       productDescription.value = currentProduct.desc
       productCategory.value = currentProduct.category

        addBtn.classList.add('d-none')
        updateBtn.classList.remove('d-none')
    }

    // updateProduct
    function updateProduct(){
        if (!validateForm()) return;
    
        const product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDescription.value,
        };
        productContainer.splice(indexUpdate, 1, product);
        localStorage.setItem('products', JSON.stringify(productContainer));
        displayProduct();
    
        addBtn.classList.remove('d-none');
        updateBtn.classList.add('d-none');
        clearForm();
    }
    
    
// clearForm 
function clearForm(){
    productName.value ="";
    productPrice.value ="";
    productCategory.value ="";
    productDescription.value ="";
}


// validation 
function validateForm() {
    let name = productName.value.trim();
    let price = productPrice.value.trim();
    let category = productCategory.value.trim();
    let desc = productDescription.value.trim();

    let isValid = true;
    let messages = [];
    if (name === "") {
        messages.push("Product name is required.");
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        messages.push("Product name must contain only letters and spaces.");
        isValid = false;
    }
    

    if (desc === "") {
        messages.push("Product description is required.");
        isValid = false;
    } else if (desc.trim().split(/\s+/).length < 2 && desc.length < 10) {
        messages.push("Product description must be at least 2 words or 10 characters long.");
        isValid = false;
    }
    
    

    if (category === "") {
        messages.push("Product category is required.");
        isValid = false;
    }

    if (desc === "") {
        messages.push("Product description is required.");
        isValid = false;
    }

    if (!isValid) {
        alert(messages.join("\n")); 
    }

    return isValid;
}
