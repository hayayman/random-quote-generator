fetchData()

async function fetchData() {

        const response = await fetch('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json');
        const data = await response.json();
        // console.log("Random Quote:", data.quoteText);
        // console.log(data.quoteAuthor)
        console.log(data)


}

