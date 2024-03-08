var books = [];
var ind;

// document.getElementById('myForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const isbn = formData.get('isbn');
//     alert(isbn);
//     console.log('Submitted isbn:', isbn);
// });

function addData(isbn, bname, auther, publication, bType, price, pages, nbooks) {
    if (localStorage.getItem("Books")) {
        books = JSON.parse(localStorage.getItem("Books") || " ");
    }
    // console.log(books);
    // console.log(isbn,bname);
    let book = {
        isbn: isbn,
        bname: bname,
        auther: auther,
        publication: publication,
        btype: bType,
        price: price,
        pages: pages,
        nbooks: nbooks
    }
    let flag = true;
    for (let b in books) {
        if ((books[b].isbn == isbn) && (books[b].bname == bname) && (books[b].auther == auther) && (books[b].publication == publication) && (books[b].btype == bType) && (books[b].price == price) && (books[b].nbooks == nbooks)) {
            alert("Data already exists..!");
            flag = false;
        }
    }
    if (flag === true) {
        // console.log("hello");
        // console.log(book);
        books.unshift(book);
        // console.log(books);
        localStorage.setItem("Books", JSON.stringify(books));
        alert("Data Submitted Succussfully...!");
    }
    // display();
}

function display() {

    if (localStorage.getItem("Books")) {
        books = JSON.parse(localStorage.getItem("Books") || "");
        // console.log(books);
    }

    const thd = document.getElementById("thd");
    const tbd = document.getElementById("tbd");

    let thead = "";
    let tbody = "";

    if (books != "") {
        thead += "<tr><th>Sr. No</th><th>ISBN No</th><th>Book Name</th><th>Auther</th><th>Publication</th><th>Book Type</th><th>Price</th><th>Pages</th><th>No. of Books</th><th>Action</th></tr>";
    }
    for (let b in books) {
        // console.log("Index :",b);
        // let tempid = books[b].isbn;
        // console.log(tempid);
        tbody += "<tr><td id='srNo'>" + `${c = Number(b) + 1}` + "</td><td>" + books[b].isbn + "</td><td>" + books[b].bname + "</td><td>" + books[b].auther + "</td><td>" + books[b].publication + "</td><td>" + books[b].btype + "</td><td>" + books[b].price + "</td><td>" + books[b].pages + "</td><td>" + books[b].nbooks + "</td><td><input type='button' class='bttn' value='Update' onclick='fillData(" + b + ")'><input type='button' class='bttn' value='Delete' onclick='deleteData(" + b + ")'></td></tr>";
    }
    thd.innerHTML = thead;
    tbd.innerHTML = tbody;

}

function deleteData(element) {
    books = JSON.parse(localStorage.getItem("Books") || "");
    // console.log(books);

    const tmp = books.filter((entry, index) => {
        // console.log("ele :"+element);
        // console.log("index : "+index);
        if (index != element) {
            return entry;
        }
        // console.log(index,entry);
    });
    localStorage.setItem("Books", JSON.stringify(tmp))
    // alert(books)
    // console.log(books);
    display();
}

function onSubmit() {

    let isbn = document.getElementById("isbn").value;    // alert("ISBN No :" + isbn);      
    let bname = document.getElementById("bname").value;  // alert("Book Name :" + bname);  
    let auther = document.getElementById("auther").value;// alert("Auther :" + auther);     
    let publication = document.getElementById("publication").value; // alert("Publication : "+ publication);
    let arr = document.getElementsByName('btype');
    let bType;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            bType = arr[i].value;
        }
    }
    // alert("Book Type : " + bType );
    let price = document.getElementById("price").value;// alert("Price :" + price);  
    let pages = document.getElementById("pages").value;// alert("Pages :" + pages);  
    let nbooks = document.getElementById("noOfBook").value;// alert("Pages :" + pages);  

    if((isbn!="")&&(bname!="")&&(auther!="")&&(publication!="")&&(arr!="")&&(bType!="")&&(price!="")&&(pages!="")&&(nbooks!=""))
    {
        if((price>=0)&&(pages>0)&&(nbooks>0))
        {
            addData(isbn,bname,auther,publication,bType,price,pages,nbooks);
        }
        else{
            alert("Price, Pages and No of Books must be greater than or equal to Zero(0)");  
            // return;
            // preventDefault();
        }
        // console.log("add");
    }
    // if ((isbn != "") && (bname != "") && (auther != "") && (publication != "") && (arr != "") && (bType != "") && (price != "") && (pages != "") && (nbooks != "")) {
    //     if ((price >= 0)) {

    //     }
    //     else {
    //         alert("Price must be greater than or equal to Zero(0)");
    //     }
    //     if ((pages > 0)) {
            
    //     } else {
    //         alert("Pages must be greater than Zero(0)");
    //     }
    //     if ((nbooks > 0)) {
    //         addData(isbn, bname, auther, publication, bType, price, pages, nbooks);
    //     }
    //     else {
    //         alert("No of Books must be greater than Zero(0)");
    //     }
    // }
}

function fillData(temp) {

    ind = temp;
    // alert(ind);
    books = JSON.parse(localStorage.getItem("Books") || "");

    const updatingObj = books[temp];

    document.getElementById("isbn").value = updatingObj.isbn;    // alert("ISBN No :" + isbn);      
    document.getElementById("bname").value = updatingObj.bname;  // alert("Book Name :" + bname);  
    document.getElementById("auther").value = updatingObj.auther;// alert("Auther :" + auther);     
    document.getElementById("publication").value = updatingObj.publication; // alert("Publication : "+ publication);

    if (updatingObj.btype == "General") {
        let g = document.getElementById("general");
        g.checked = true;
    }
    else {
        let s = document.getElementById("special");
        s.checked = true;
    }
    console.log("Type ", updatingObj.btype);

    document.getElementById("price").value = updatingObj.price;// alert("Price :" + price);  
    document.getElementById("pages").value = updatingObj.pages;// alert("Pages :" + updatingObj.pages); 
    document.getElementById("noOfBook").value = updatingObj.nbooks;

    let sub = document.getElementById("submit");
    sub.hidden = true;

    let update = document.getElementById("update");
    update.hidden = false;


}

function updateData() {

    // alert(ind);

    let isbn = document.getElementById("isbn").value;    // alert("ISBN No :" + isbn);      
    let bname = document.getElementById("bname").value;  // alert("Book Name :" + bname);  
    let auther = document.getElementById("auther").value;// alert("Auther :" + auther);     
    let publication = document.getElementById("publication").value; // alert("Publication : "+ publication);
    let arr = document.getElementsByName('btype');
    let bType;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            bType = arr[i].value;
        }
    }
    // alert("Book Type : " + bType );
    let price = document.getElementById("price").value;// alert("Price :" + price);  
    let pages = document.getElementById("pages").value;// alert("Pages :" + pages);  
    let nbooks = document.getElementById("noOfBook").value;// alert("Pages :" + pages);  

    if ((isbn != "") && (bname != "") && (auther != "") && (publication != "") && (arr != "") && (bType != "") && (price != "") && (pages != "") && (nbooks != "")) {
        let book = {
            isbn: isbn,
            bname: bname,
            auther: auther,
            publication: publication,
            btype: bType,
            price: price,
            pages: pages,
            nbooks: nbooks
        }

        let flag = true;
        for (let b in books) {
            if ((books[b].isbn == isbn) && (books[b].bname == bname) && (books[b].auther == auther) && (books[b].publication == publication) && (books[b].btype == bType) && (books[b].price == price) && (books[b].nbooks == nbooks)) {
                alert("Data already exists..!");
                flag = false;
            }
        }

        if (flag === true) {
            books.splice(ind, 1, book);
            localStorage.setItem("Books", JSON.stringify(books));
            alert("Data Updated Successfully...!")
        }
    }
}

// Points to be noticable.

// 1. Make a separate function for Check the data is exists or not while we update the date.
// 2. Check any field is empty or not, make separate function for the reusability purpose. 

/*function updateData(temp) {
    // console.log("index : ",temp);
    books = JSON.parse(localStorage.getItem("Books")||"");

    const updatingObj = books[temp];

    document.getElementById("isbn").value=updatingObj.isbn;    // alert("ISBN No :" + isbn);      
    document.getElementById("bname").value=updatingObj.bname;  // alert("Book Name :" + bname);  
    document.getElementById("auther").value=updatingObj.auther;// alert("Auther :" + auther);     
    document.getElementById("publication").value=updatingObj.publication; // alert("Publication : "+ publication);
    
    if(updatingObj.btype == "General")
    {
        let g = document.getElementById("general");
        g.checked = true;
    }
    else{
        let s = document.getElementById("special");
        s.checked = true;    
    }    
    console.log("Type " ,updatingObj.btype);

    document.getElementById("price").value=updatingObj.price;// alert("Price :" + price);  
    document.getElementById("pages").value=updatingObj.pages;// alert("Pages :" + updatingObj.pages); 
    document.getElementById("noOfBook").value=updatingObj.nbooks; // console.log(updatingObj);
    
    deleteData(temp);

}
*/
