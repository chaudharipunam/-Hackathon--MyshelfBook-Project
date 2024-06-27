const booksData = [
    { id: 1, title: 'Animal Farm', author: 'George Orwell', releaseDate: '1945-08-17', coverImage: './images/img3.jpg', info: 'Animal Farm is a satirical allegorical novella, in the form of a beast fable, by George Orwell, first published in England on 17 August 1945. It tells the story of a group of anthropomorphic farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.' },
    { id: 2, title: 'Ek Samandar, Mere Andar', author: 'Usha Preet', releaseDate: '2024-01-29', coverImage: './images/img.jpg', info: "'Ek Samandar, Mere Andar,' a collection of 75 poems penned by BrahMos Aerospace Deputy CEO Sanjeev Joshi, was launched in a prestigious event graced by top Indian defence and literary figures. This book reflects the confluence of creative expression and defence expertise." },
    { id: 3, title: 'Four Star of Destiny', author: 'Manoj Mukund', releaseDate: '2024-04-30', coverImage: './images/img2.jpg', info: 'General Naravane has written a simple and heart-warming account of his life and times and the experiences that shaped his character, right from childhood to his years in the service, rising through the hierarchy to become the twenty-eighth Chief of the Indian Army.' },
    { id: 4, title: 'The Tale of Peter Rabbit', author: 'Beatrix Potter', releaseDate: '1902-01-01', coverImage: './images/img4.jpg', info: "The Tale of Peter Rabbit is a children's book written and illustrated by Beatrix Potter that follows mischievous and disobedient young Peter Rabbit as he gets into, and is chased around, the garden of Mr. McGregor. He escapes and returns home to his mother, who puts him to bed after offering him chamomile tea." },
    { id: 5, title: 'Animal', author: 'Lisa Taddeo', releaseDate: '2021-08-08', coverImage: './images/img9.jpg', info: 'Animal is about a world that concentrates sexual abuse on the vulnerable, then treats their resulting dysfunction as an invitation to more sexual abuse. The idea is boldly handled, and the writing is often exceptionally good.' },
    { id: 6, title: 'Animal Dream', author: 'Barbara Kingsolver', releaseDate: '1990-09-01', coverImage: './images/img10.jpg', info: 'Animal Dreams depicts how communities and cultural influences can enable traumatized people to connect with their past and with other people, thus finding value in their lives however much has been destroyed or lost. The novel presents such influences through prominent depictions of rituals.' }
];

document.getElementById('searchBar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const exactMatches = booksData.filter(book => book.title.toLowerCase() === query || book.author.toLowerCase() === query);
    const partialMatches = booksData.filter(book => 
        (book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)) &&
        !(book.title.toLowerCase() === query || book.author.toLowerCase() === query)
    ).sort((a, b) => a.title.localeCompare(b.title));
    
    const filteredBooks = [...exactMatches, ...partialMatches];
    displaySearchResults(filteredBooks);
});

function displaySearchResults(books) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<h2>Books</h2>';
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.innerHTML = `
            <img src="${book.coverImage}" alt="${book.title}" onclick="showBookDetails(${book.id}, '${book.title}', '${book.author}', '${book.releaseDate}', '${book.info ? book.info.replace(/'/g, "\\'") : ''}')">
            <div class="book-details">
                <strong>${book.title}</strong>
                <p>${book.author}</p>
                <p>${book.releaseDate}</p>
                <button onclick="addToFavourites(${book.id})">Add to Favourite</button>
            </div>
        `;
        searchResults.appendChild(bookElement);
    });
}

function showBookDetails(id, title, author, releaseDate, info) {
    const bookDetails = document.getElementById('bookDetails');
    bookDetails.innerHTML = `
        <h2>${title}</h2>
        <p>Author: ${author}</p>
        <p>Release Date: ${releaseDate}</p>
        <p>${info}</p>
    `;
}

function addToFavourites(bookId) {
    const book = booksData.find(b => b.id === bookId);
    const favourites = document.getElementById('favourites');
    
    // Check if the book is already in favourites
    const existingBookElement = favourites.querySelector(`[data-book-id="${bookId}"]`);
    if (existingBookElement) return;

    const bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.setAttribute('data-book-id', bookId);
    bookElement.innerHTML = `
        <img src="${book.coverImage}" alt="${book.title}" onclick="showBookDetails(${book.id}, '${book.title}', '${book.author}', '${book.releaseDate}', '${book.info.replace(/'/g, "\\'")}')">
        <div class="book-details">
            <strong>${book.title}</strong>
            <p>${book.author}</p>
            <p>${book.releaseDate}</p>
            <button onclick="removeFromFavourites(${bookId})">Remove from Favourite</button>
        </div>
    `;
    favourites.appendChild(bookElement);

    const searchResults = document.getElementById('searchResults');
    const buttons = searchResults.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.onclick.toString().includes(`addToFavourites(${bookId})`)) {
            button.textContent = 'Added in Favourite';
            button.disabled = true;
            button.style.color="Black";
            button.style.fontWeight="900";
            button.style.backgroundColor="gray";
        }
    });
}

function removeFromFavourites(bookId) {
    const favourites = document.getElementById('favourites');
    const bookElement = favourites.querySelector(`[data-book-id="${bookId}"]`);
    if (bookElement) {
        favourites.removeChild(bookElement);
    }

    const searchResults = document.getElementById('searchResults');
    const buttons = searchResults.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.onclick.toString().includes(`addToFavourites(${bookId})`)) {
            button.textContent = 'Add to Favourite';
            button.disabled = false;
            button.style.backgroundColor="pink";
            button.style.fontWeight="200";
        }
    });
}

const additionalBooks = [
    { id: 7, title: 'Time Machine', author: 'R.L. Stevenson', releaseDate: '1895', coverImage: './images/img6.jpg', info: 'The Time Machine, first novel by H. G. Wells, published in book form in 1895. The novel is considered one of the earliest works of science fiction and the progenitor of the “time travel” subgenre.' },
    { id: 8, title: 'The Tempest', author: 'H.G Wells', releaseDate: '1623', coverImage: './images/img8.jpg', info: 'The Tempest, drama in five acts by William Shakespeare, first written and performed about 1611 and published in the First Folio of 1623 from an edited transcript, by Ralph Crane (scrivener of the King\'s Men), of the author\'s papers after they had been annotated for production.' },
    { id: 9, title: 'Ulysses', author: 'James Joyce', releaseDate: 'December 1920', coverImage: './images/img11.jpg', info: 'Ulysses is a modernist novel by the Irish writer James Joyce. Parts of it were first serialized in the American journal The Little Review from March 1918 to December 1920, and the entire work was published in Paris by Sylvia Beach on 2 February 1922, Joyce\'s fortieth birthday.' }
];
let currentAdditionalIndex = 0;
function displayAdditionalBooks(index) {
    const additionalBooksContainer = document.getElementById('additionalBooks');
    additionalBooksContainer.innerHTML = '';
    if (index >= 0 && index < additionalBooks.length) {
        const book = additionalBooks[index];
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.innerHTML = `
            <img src="${book.coverImage}" alt="${book.title}" onclick="showBookDetails(${book.id}, '${book.title}', '${book.author}', '${book.releaseDate}', '${book.info ? book.info.replace(/'/g, "\\'") : ''}')">
            <div class="book-details">
                <strong>${book.title}</strong>
                <p>${book.author}</p>
                <p>${book.releaseDate}</p>
            </div>
        `;
        additionalBooksContainer.appendChild(bookElement);
    }
}
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentAdditionalIndex > 0) {
        currentAdditionalIndex--;
        displayAdditionalBooks(currentAdditionalIndex);
    }
});
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentAdditionalIndex < additionalBooks.length - 1) {
        currentAdditionalIndex++;
        displayAdditionalBooks(currentAdditionalIndex);
    }
});
displayAdditionalBooks(currentAdditionalIndex);
