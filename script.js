const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");

// loading animation
function showloadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide the loading animation
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// get quote from API
async function getQuote() {
  showloadingSpinner();

  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // if author is blank, then display unkown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unkown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    console.log(data);
    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    getQuote();
    console.log("Whoops, no quote", error);
  }
}

// Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuote();
