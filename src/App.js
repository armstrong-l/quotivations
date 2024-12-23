import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quotes from "./components/quotes/Quotes";
import { Loader } from "react-feather";
import "./App.css";


function App() {

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  // const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];

  const maxFaves = 3;

// Fetching the quote data
  const fetchQuotes = async () => {
    try {
      setLoading(true);
    const request = await fetch(quotesUrl);
    const response = await request.json(); 
    setQuotes(response);
    // console.log(quotes);
  }

catch (e){
  console.log("Something went wrong", e)
};
setLoading(false);
  };

// Fetching data for categories array for drop down list
  const fetchCategories = async () => {
    const listCategories = ["All"];
    try {
    const request = await fetch(quotesUrl);
    const response = await request.json(); 
    const quoteCategories = response.map((item) => {return(item.categories)});
    const categoryArray = quoteCategories.toString().split(",")

    for (const categoryName of categoryArray) {
           if (!listCategories.includes(categoryName))
        {listCategories.push(categoryName);
    }}
       console.log(listCategories);
       setCategories(listCategories);   
  }

catch (e){
  console.log("Something went wrong", e)
  };
};



useEffect(() => {
  fetchQuotes();
  fetchCategories();
}, [])

const handleCategoryChange = (e) => {
  setCategory(e.target.value);
}; 

const filteredQuotes = category !== "All" ? 
  quotes.filter((quote) => (quote.categories.includes(category))) : 
  quotes;

  const addToFavorites = (quoteId) => {
    // console.log(`In favorites quote with id ${quoteId}`);
   
    const selectedQuote = quotes.find((quote)=> quote.id === quoteId )
    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id)
        
    if (alreadyFavorite) 
      {console.log("This quote is already in your favorites! Choose another.")

      } else if (favoriteQuotes.length < maxFaves) {
      setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      console.log("Added to favorites!");
      console.log(favoriteQuotes);
    } else {console.log("Max number of Favorite Quotes reached.  Please deleted one to add another")}
    // console.log(selectedQuote);
  };

  return (
    <div className='App'>
      <Header />
      <main>
      <section className = "favorite-quotes">
        <div className = "wrapper quotes">
          <h3>Top 3 favorite quotes</h3>
          {favoriteQuotes.length > 0 && JSON.stringify(favoriteQuotes)}
          <div className = "favorite-quotes-description">
            <p>You can add up to three favorites by selecting from the options below.<br/>
            once you choose, they will appear here.</p>
          </div>
        </div>
      </section>
      {loading ? (<Loader/>) : 
      (<Quotes 
      filteredQuotes={filteredQuotes} 
      categories={categories} 
      category={category}
      handleCategoryChange={handleCategoryChange}
      addToFavorites={addToFavorites}
      />
      )}
      </main>
      <Footer />
    </div>
  );
}
export default App;
