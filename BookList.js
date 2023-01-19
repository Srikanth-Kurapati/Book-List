/************************************************************************

// designing app with es5

// book constrcutor
function Book(title,author,bookID){
    this.title = title;
    this.author = author;
    this.bookID = bookID;
}

// ui constructor
function UI(){}


UI.prototype.addToBookList = function(book){
    
    const list = document.querySelector('.book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.bookID} </td>
    <td> <a href ="#" class = 'delete'> X </td>
    `
    list.appendChild(row);
}

UI.prototype.clearfields = function(){
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
    document.querySelector('.book-id').value = '';
}

UI.prototype.showAlert = function(msg,color){

    const message = document.querySelector('.message');
    message.innerHTML = msg;
    message.style.backgroundColor = color;

    setTimeout(function(){
        message.innerHTML = "";
        
    },2000);
    
}

UI.prototype.removeBook = function(target){

    if(target.className === 'delete'){
       target.parentElement.parentElement.remove();
       
}

}

// show book-list values in UI 

// add form values to book list
document.getElementById('bookForm').addEventListener('submit',addToUI);

function addToUI(e){
    //get values from input(s)

    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const bookID = document.querySelector('.book-id').value;

    const book = new Book(title,author,bookID);
    
    const ui = new UI();

    if(title === "" || author ==="" || bookID === ""){
        ui.showAlert("Please fill out the fields",'red');
    }else{
        ui.addToBookList(book);
        ui.clearfields();
        ui.showAlert("book added to shelf",'green');     
    }  
    e.preventDefault();  
}

// remove books

document.querySelector('.book-list').addEventListener('click', function(e){

    const ui = new UI();

    ui.removeBook(e.target,"Hi");
    ui.showAlert('book removed',"orange");
   
    e.preventDefault();
    }
);


static getBooks(){

        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book) {

        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBooks() {
        
    }
    static removeBooks(){

    }
************************************************************************************************** */


// designing app with es6


class Book{
    constructor(title,author,bookId){
        this.author = author;
        this.title = title;
        this.bookId = bookId;

    }
}

class UI{
    constructor(){

        // add book

         this.addBookToShelf = (book) =>{
            const bookList = document.querySelector('.book-list');

            // creating a row for new book values
            const row = document.createElement('tr');
            // row.className = 'row';

// add new book details to a row

            row.innerHTML = `
            <td> ${book.title} </td>
            <td> ${book.author} </td>
            <td> ${book.bookId} </td>
            <td> <a href = '#' class ='delete'> X </td>
            `;

            bookList.appendChild(row);
            
        };

// show alert

        this.showAlert = (msg,color) => {
            const message = document.querySelector('.message')

            message.innerHTML = msg;
            message.style.backgroundColor = color;

            setTimeout(function()
            {message.innerHTML = ''},
            2000)
        }

 // clear input fields 
 
        this.clearFields = () => {
            document.querySelector('.title').value   = '';
            document.querySelector('.author').value  = '';
            document.querySelector('.book-id').value = '';
        }


 // delete book

        this.deleteBook = (target) =>{
            if(target.className === "delete"){
                target.parentElement.parentElement.remove();
            }
            
        }
    }
}

class Store{

    static getBooks(){
       let books;
       if(localStorage.getItem('books') === null){
        books = [];
       } else{
        books = JSON.parse(localStorage.getItem('books'));
       }
    return books;   
    }
    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));

    }
    static displayBooks(){

        const books = Store.getBooks();
        books.forEach(function(book){

            const ui = new UI();
            ui.addBookToShelf(book);
            
        });

    }
    static removeBooks(isbn){
        // console.log(bookId); 
       let books = Store.getBooks(); 

       books.forEach(book => {

        if(book.bookId === isbn){
            console.log("Hi");
            console.log(book.author);
        }
        
        console.log(book.bookId); 
       });


    }
    
    // static removeBook(isbn) {
    //     const books = Store.getBooks();
    
    //     books.forEach(function(book, index){
    //      if(book.isbn === isbn) {
    //       books.splice(index, 1);
    //      }
    //     });
    
    //     localStorage.setItem('books', JSON.stringify(books));
    //   }
    // }
}

document.addEventListener("DOMContentLoaded",Store.displayBooks)
document.getElementById('bookForm').addEventListener('submit',addBook);

function addBook(e){
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const bookId = document.querySelector('.book-id').value;

    const book = new Book(title, author, bookId);

    const ui = new UI();

    if(title === "" || author === "" || bookId === ""){
        ui.showAlert("Please fill all the fields","red");
    }else{
        ui.addBookToShelf(book);
        Store.addBooks(book);
        ui.showAlert('book added to your shelf','green');
        ui.clearFields();

        // Adding book to local storage
       
    }
    e.preventDefault();
}

document.querySelector('.book-shelf').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("book removed from shelf", 'orange');

    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault();
});