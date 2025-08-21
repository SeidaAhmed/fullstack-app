// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle read status method (on prototype)
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Library array
let library = [];

// Function to add book
function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
  displayBooks();
}

// Function to remove book by ID
function removeBook(id) {
  library = library.filter(book => book.id !== id);
  displayBooks();
}

// Function to display all books
function displayBooks() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = ""; // clear old content

  library.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-id", book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "✅ Read" : "❌ Not Read"}</p>
      <button class="toggleBtn">Toggle Read</button>
      <button class="removeBtn">Remove</button>
    `;

    // Remove button
    card.querySelector(".removeBtn").addEventListener("click", () => {
      removeBook(book.id);
    });

    // Toggle read button
    card.querySelector(".toggleBtn").addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    libraryDiv.appendChild(card);
  });
}

// Handle form
const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const closeDialog = document.getElementById("closeDialog");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => dialog.showModal());
closeDialog.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBook(title, author, pages, read);
  dialog.close();
  bookForm.reset();
});

// Add some sample books manually
addBook("The Quran", "Unknown", 604, true);
addBook("Clean Code", "Robert C. Martin", 464, false);
