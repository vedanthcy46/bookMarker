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
// localStorage.removeItem('book');
// localStorage.removeItem('user');
let book = JSON.parse(localStorage.getItem('book'));

if (book === null) {
    localStorage.setItem('book', JSON.stringify([]))
    book = [];
}

let user = JSON.parse(localStorage.getItem('user'));
if (user === null){
    localStorage.setItem('user', JSON.stringify([]));
    user = [];
}

// Validate name input on change
siteNameInput.addEventListener("change", function() {
    if (siteNameInput.value === "") {
        siteNameErrMsg.textContent = "Please enter a site name";
    } else {
        siteNameErrMsg.textContent = "";
    }
});

// Validate URL input on change
siteUrlInput.addEventListener("change", function() {
    if (siteUrlInput.value === "") {
        siteUrlErrMsg.textContent = "Please enter a site URL";
    } else {
        siteUrlErrMsg.textContent = "";
    }
});

function bookMark(obj) {
    let listItem = document.createElement("li");
    listItem.classList.add("item", 'p-3', 'mb-4');
    bookmarksList.appendChild(listItem);
    let index = user.findIndex(function(el){
        if (el.userId === obj.userId){
            return true;
        }
    })
    let name = null;
    if (index != -1)
        name = user[index].name;

    userName.textContent = name;
    let nameEl = document.createElement('p');
    nameEl.textContent = obj.name;
    nameEl.classList.add('siteName', 'mb-2')
    listItem.appendChild(nameEl);
    let linkEl = document.createElement("a");
    linkEl.href = obj.url;
    linkEl.textContent = obj.url;
    linkEl.target = "_blank";

    listItem.appendChild(linkEl);

    // Clear inputs
    siteNameInput.value = "";
    siteUrlInput.value = "";
}
let obj = {
    userId:null,
    content:[]
}
// Handle form submit
bookmarkForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let siteName = siteNameInput.value.trim();
    let siteUrl = siteUrlInput.value.trim();

    // Validate inputs
    if (siteName === "") {
        siteNameErrMsg.textContent = "Please enter a site name";
    } else {
        siteNameErrMsg.textContent = "";
    }

    if (siteUrl === "") {
        siteUrlErrMsg.textContent = "Please enter a site URL";
    } else {
        siteUrlErrMsg.textContent = "";
    }

    // If any input empty, stop execution
    if (siteName === "" || siteUrl === "") {
        return;
    }
    let arr = {name:siteName, url:siteUrl}
    book.push(obj);
    localStorage.setItem('book', JSON.stringify(book));
    bookMark(obj);
});

for (let item of book) {
    bookMark(item);
}

// LOGIN

let loginForm = document.getElementById('loginForm');
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let loginEmailErr = document.getElementById('loginEmailErr');
let loginPasswordErr = document.getElementById('loginPasswordErr');
let loginPage = document.getElementById('loginPage');
let bookMarkerPage = document.getElementById('bookMarkerPage');
let loading = document.getElementById('loading');
let login = JSON.parse(localStorage.getItem('login'));
let loginWrong = document.getElementById('loginWrong');

// localStorage.removeItem('login');
// if (login === null){
//     localStorage.setItem('login', JSON.stringify([]));
//     login = []
// }

let obj1 = {
    email:null,
    pass:null
}
function check(email, pass){
    let index = user.findIndex(function(el){
        if (el.email === email && el.pass === pass){
            return true;
        }
        else{
            return false;
        }
    })
    console.log(index)
    if (index === -1){
        return false;
    }
    return true;
}

loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    let emailVal = loginEmail.value;
    let passVal = loginPassword.value;
    loginEmailErr.textContent = ""
    loginPasswordErr.textContent = ""
    loginWrong.textContent = ""
    if (!emailVal){
        loginEmailErr.textContent = "Required*"
    }
    if (!passVal){
        loginPasswordErr.textContent = "Required*";
    }
    if (!emailVal || !passVal)
        return;
    // console.log(emailVal, passVal);
    let c = check(emailVal, passVal);
    console.log(check)
    // if (c || login.length === 0){
    //     obj1.email = emailVal;
    //     obj1.pass = passVal;
    //     login.push(obj1);
    //     localStorage.setItem('login', JSON.stringify(login));
    // }
    // else{
    //     loginEmailErr.textContent = "Email already taken!"
    // }

    if (c){
        loading.classList.remove('d-none')
        loginPage.classList.add('d-none');
        setTimeout(function(){
            registerPage.classList.add('d-none');
            bookMarkerPage.classList.remove('d-none');
            loading.classList.add('d-none')
        }, 2000)
        return true;
    }
    else{
        loginWrong.textContent = 'Email/Password is incorrect!';
        return false;
    }
}
)

//logout

let logout = document.getElementById('logout');

logout.addEventListener('click', function(){
    loading.classList.remove('d-none')
    bookMarkerPage.classList.add('d-none');
    setTimeout(function(){
        loginPage.classList.remove('d-none');
        loading.classList.add('d-none')
        registerPage.classList.add('d-none');
    }, 2000)
    
})


//Register


let registerForm = document.getElementById('registerForm');
let registerEmail = document.getElementById('registerEmail');
let registerName = document.getElementById('registerName');
let registerPassword = document.getElementById('registerPassword');
let registerConfPassword = document.getElementById('registerConfPassword');

let registerEmailErr = document.getElementById('registerEmailErr');
let registerNameErr = document.getElementById('registerNameErr');
let registerPasswordErr = document.getElementById('registerPasswordErr');
let registerConfPasswordErr = document.getElementById('registerConfPasswordErr');

let registerPage = document.getElementById('registerPage');
let registerWrong = document.getElementById('registerWrong')
// localStorage.removeItem('user');


function emailCheck(emailVal){
    let index = user.findIndex(function(el){
        if (el.email === emailVal){
            return true;
        }
        else{
            return false
        }
    })
    if (index === -1){
        return true;
    }
    return false;
}
function nameCheck(nameVal){
    let index = user.findIndex(function(el){
        if (el.name === nameVal){
            return true;
        }
        else{
            return false;
        }
    })
    if (index === -1){
        return true;
    }
    return false
} 

let obj2 = {
    userId:null,
    name:null,
    email:null,
    pass:null
}
registerForm.addEventListener('submit', function(event){
    event.preventDefault();
    let nameVal = registerName.value;
    let emailVal = registerEmail.value;
    let passVal = registerPassword.value;
    let confPassVal = registerConfPassword.value;

    registerNameErr.textContent = "";
    registerEmailErr.textContent = ""
    registerPasswordErr.textContent = ""
    registerConfPasswordErr.textContent = "";
    
    registerWrong.textContent = ""
    if (!nameVal){
        registerNameErr.textContent = "Required*";
        
    }
    if (!emailVal){
        registerEmailErr.textContent = "Required*"
    }
    if (!passVal){
        registerPasswordErr.textContent = "Required*";
    }
    if (!confPassVal){
        registerConfPasswordErr.textContent = "Required*";

    }
    if (!emailVal || !passVal || !nameVal || !confPassVal)
        return;
    // console.log(emailVal, passVal);
    if (passVal !== confPassVal){
        registerConfPasswordErr.textContent = 'Password not matching!'
        return;
    }
    console.log(nameCheck(nameVal), emailCheck(emailVal));
    if (!nameCheck(nameVal)){
        registerNameErr.textContent = "Name already taken";
    }
    if (!emailCheck(emailVal)){
        registerEmailErr.textContent = "Email already taken";
    }
    let c = nameCheck(nameVal) && emailCheck(emailVal)
    if (c || user.length === 0){

        // obj.userId = 1000 + user.length + 1;
        // book.push(obj);
        // localStorage.setItem('book', JSON.stringify(book));
        obj2.userId = 1000 + user.length + 1;
        obj2.name = nameVal;
        obj2.email = emailVal;
        obj2.pass = passVal;
        user.push(obj2);
        localStorage.setItem('user', JSON.stringify(user));
        registerPage.classList.add('d-none');
        loading.classList.remove('d-none')
        setTimeout(function(){
            loginPage.classList.remove('d-none');
            bookMarkerPage.classList.add('d-none');
            loading.classList.add('d-none')
        }, 2000)
        return true;
    }
    // else{
    //     wrong.textContent = 'Email/Password is incorrect!';
    // }
})

clickRegister.addEventListener('click', function(event){
    // window.location.reload()
    registerPage.classList.remove('d-none');
    loginPage.classList.add('d-none');
})
clickLogin.addEventListener('click', function(){
    window.location.reload()
    registerPage.classList.add('d-none');
    loginPage.classList.remove('d-none');

})