let bookmarkForm = document.getElementById("bookmarkForm");
let siteNameInput = document.getElementById("siteNameInput");
let siteUrlInput = document.getElementById("siteUrlInput");
let submitBtn = document.getElementById("submitBtn");
let siteNameErrMsg = document.getElementById("siteNameErrMsg");
let siteUrlErrMsg = document.getElementById("siteUrlErrMsg");
let bookmarksList = document.getElementById("bookmarksList");

let clickLogin = document.getElementById('clickLogin');
let clickRegister = document.getElementById('clickRegister');
let userName = document.getElementById('userName');

let book = JSON.parse(localStorage.getItem('book')) || [];
localStorage.setItem('book', JSON.stringify(book));

let user = JSON.parse(localStorage.getItem('user')) || [];
localStorage.setItem('user', JSON.stringify(user));

let bookMarkerPage = document.getElementById('bookMarkerPage');
let saveBtn = document.getElementById('saveBtn');
let loginPage = document.getElementById('loginPage');
let loading = document.getElementById('loading');
let registerPage = document.getElementById('registerPage');
let id = null;


// localStorage.removeItem('book');
// localStorage.removeItem('user');

// ------------------ INPUT VALIDATION ------------------

siteNameInput.addEventListener("input", function () {
    siteNameErrMsg.textContent = siteNameInput.value.trim() === "" ? "Please enter a site name" : "";
});

siteUrlInput.addEventListener("input", function () {
    siteUrlErrMsg.textContent = siteUrlInput.value.trim() === "" ? "Please enter a site URL" : "";
});


// ------------------ ADD BOOKMARK ITEM ------------------



function bookMark(obj) {
    let listItem = document.createElement("li");
    listItem.classList.add("item", "p-3", "mb-4");
    
    let index = user.findIndex(el => el.userId === obj.userId);
    let name = index !== -1 ? user[index].name : null;
    
    // update user name top
    userName.textContent = name;
    
    let nameEl = document.createElement('p');
    nameEl.textContent = obj.name;
    nameEl.classList.add('siteName', 'mb-2');
    listItem.appendChild(nameEl);
    
    let div = document.createElement('div');
    div.classList.add('d-flex', 'justify-content-between');
    listItem.appendChild(div);
    
    let linkEl = document.createElement("a");
    linkEl.href = obj.url;
    linkEl.textContent = obj.url;
    linkEl.target = "_blank";
    div.appendChild(linkEl);
    
    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-delete-left')
    deleteIcon.style.cursor = 'pointer';
    div.appendChild(deleteIcon);
    
    deleteIcon.addEventListener('click', function(){
        bookmarksList.removeChild(listItem);
        let index = book.findIndex(function(el){
            if (el.userId === id && el.bookId === obj.bookId){
                return  true;
            }
        })
        book = book.filter(el=>{
            el.bookId !== obj.bookId 
        })
    })
    
    bookmarksList.appendChild(listItem);
    
    siteNameInput.value = "";
    siteUrlInput.value = "";
}




bookmarkForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let siteName = siteNameInput.value.trim();
    let siteUrl = siteUrlInput.value.trim();

    if (siteName === "") siteNameErrMsg.textContent = "Please enter a site name";
    if (siteUrl === "") siteUrlErrMsg.textContent = "Please enter a site URL";
    if (siteName === "" || siteUrl === "") return;

    // Create unique bookmark object
    let obj = {
        userId: id,
        bookId:book.length + 1,
        name: siteName,
        url: siteUrl
    };

    book.push(obj);
    // localStorage.setItem("book", JSON.stringify(book));
    
    bookMark(obj);
});

let el1 = user.find(function(el){
    if (el.isActive === true){
        return true;
    }
})
if (el1) {
    id = el1.userId;
    userName.textContent = el1.name;

    bookMarkerPage.classList.remove('d-none');
    loginPage.classList.add('d-none');

    loadItems();
}

// ------------------Save Button ----------------------

saveBtn.addEventListener('click', function(){
    localStorage.setItem("book", JSON.stringify(book));

})

// ------------------ LOAD USER BOOKMARKS ------------------

function loadItems() {
    bookmarksList.innerHTML = "";
    for (let item of book) {
        if (item.userId === id) {
            bookMark(item);
        }
    }
}


// ------------------ LOGIN SYSTEM ------------------

let loginForm = document.getElementById('loginForm');
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');

let loginEmailErr = document.getElementById('loginEmailErr');
let loginPasswordErr = document.getElementById('loginPasswordErr');
let loginWrong = document.getElementById('loginWrong');


function check(email, pass) {
    return user.find(el => el.email === email && el.pass === pass) || null;
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    loginEmailErr.textContent = "";
    loginPasswordErr.textContent = "";
    loginWrong.textContent = "";

    let emailVal = loginEmail.value.trim();
    let passVal = loginPassword.value.trim();

    if (!emailVal) loginEmailErr.textContent = "Required*";
    if (!passVal) loginPasswordErr.textContent = "Required*";
    if (!emailVal || !passVal) return;

    let result = check(emailVal, passVal);

    if (result) {
        id = result.userId;
        userName.textContent = result.name;
        let index = user.indexOf(result);
        console.log(index)
        user[index].isActive = true;
        localStorage.setItem('user', JSON.stringify(user));
        loadItems();

        loading.classList.remove("d-none");
        loginPage.classList.add("d-none");

        setTimeout(() => {
            registerPage.classList.add("d-none");
            bookMarkerPage.classList.remove("d-none");
            loading.classList.add("d-none");
        }, 2000);
    } else {
        loginWrong.textContent = "Email/Password is incorrect!";
    }
});


// ------------------ LOGOUT ------------------

let logout = document.getElementById("logout");

logout.addEventListener("click", function () {
    console.log(id);
    let index = user.findIndex(function(el){
        if (el.userId === id){
            return true;
        }
    })
    console.log(index);
    if (index !== -1)
        user[index].isActive = false;
    localStorage.setItem('user', JSON.stringify(user));
    id = null;
    bookmarksList.innerHTML = "";

    loading.classList.remove("d-none");
    bookMarkerPage.classList.add("d-none");

    setTimeout(() => {
        loginPage.classList.remove("d-none");
        loading.classList.add("d-none");
        registerPage.classList.add("d-none");
    }, 2000);
});


// ------------------ REGISTER SYSTEM ------------------

let registerForm = document.getElementById('registerForm');

let registerEmail = document.getElementById('registerEmail');
let registerName = document.getElementById('registerName');
let registerPassword = document.getElementById('registerPassword');
let registerConfPassword = document.getElementById('registerConfPassword');

let registerEmailErr = document.getElementById('registerEmailErr');
let registerNameErr = document.getElementById('registerNameErr');
let registerPasswordErr = document.getElementById('registerPasswordErr');
let registerConfPasswordErr = document.getElementById('registerConfPasswordErr');
let registerWrong = document.getElementById('registerWrong');


function emailCheck(emailVal) {
    return !user.some(el => el.email === emailVal);
}

function nameCheck(nameVal) {
    return !user.some(el => el.name === nameVal);
}

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    registerNameErr.textContent = "";
    registerEmailErr.textContent = "";
    registerPasswordErr.textContent = "";
    registerConfPasswordErr.textContent = "";
    registerWrong.textContent = "";
    registerWrong.classList.remove("text-success");

    let nameVal = registerName.value.trim();
    let emailVal = registerEmail.value.trim();
    let passVal = registerPassword.value.trim();
    let confPassVal = registerConfPassword.value.trim();

    if (!nameVal) registerNameErr.textContent = "Required*";
    if (!emailVal) registerEmailErr.textContent = "Required*";
    if (!passVal) registerPasswordErr.textContent = "Required*";
    if (!confPassVal) registerConfPasswordErr.textContent = "Required*";
    if (!nameVal || !emailVal || !passVal || !confPassVal) return;

    if (passVal !== confPassVal) {
        registerConfPasswordErr.textContent = "Passwords do not match!";
        return;
    }

    if (!nameCheck(nameVal)) registerNameErr.textContent = "Name already taken";
    if (!emailCheck(emailVal)) registerEmailErr.textContent = "Email already taken";

    if (!nameCheck(nameVal) || !emailCheck(emailVal)) return;

    let newUser = {
        userId: 1000 + user.length + 1,
        name: nameVal,
        email: emailVal,
        pass: passVal,
        isActive:false
    };

    user.push(newUser);
    localStorage.setItem("user", JSON.stringify(user));

    registerWrong.textContent = "Success";
    registerWrong.classList.add("text-success");

    setTimeout(() => {
        registerPage.classList.add("d-none");
        loading.classList.remove("d-none");
    }, 1000);

    setTimeout(() => {
        loginPage.classList.remove("d-none");
        loading.classList.add("d-none");
    }, 2000);
});


// -------------------------------- SWITCH PAGES -------------------------------

clickRegister.addEventListener("click", function () {
    registerPage.classList.remove("d-none");
    loginPage.classList.add("d-none");
});

clickLogin.addEventListener("click", function () {
    window.location.reload();
});
