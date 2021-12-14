const bestSellersBookContainer = document.querySelector("#best-sellers-book-container");
const novelBookContainer = document.querySelector("#novel-book-container");
const sciFiBookContainer = document.querySelector("#sci-fi-book-container");

const getBestSellersInfo = () => {
    fetch("https://www.googleapis.com/books/v1/users/110316076195152108075/bookshelves/1001/volumes?key=AIzaSyDuUyytYz0OAoxTiqQefzhgYdG1K5v9Q3k")
    .then(res =>  res.json())
    .then(data => {
      console.log(data);
      createHTML(data.items)
    })
  }
  
getBestSellersInfo();

const createHTML = (books) => {
    const bookCard = books.reduce((acc, curr) => {
        return acc + `
        <figure class="book-card">
            <div class="book-image-container">
                <img src="${curr.volumeInfo.imageLinks.thumbnail}" class="book-image">
            </div>
            <figcaption class="book-info">
                <h4 class="book-name">${curr.volumeInfo.title}</h4>
                <a href="" class="book-link">More details</a>
            </figcaption>
        </figure>
        `
    }, "");

    bestSellersBookContainer.innerHTML = bookCard;
}