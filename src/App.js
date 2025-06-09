import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Quotes from "./components/quotes/Quotes";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes"
import Message from "./components/Message";
import { Loader } from "react-feather";
import "./App.css";


function App() {

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [favoriteQuotes, setFavoriteQuotes] = useState( JSON.parse(window.localStorage.getItem("favoriteQuotesString")) || []);
  const [messageText, setMessageText] = useState(""); 
  const [showMessage, setShowMessage] = useState(false);

  // url containing categories (All, Leadership, Empathy, Motivation, Learning, Success, Empowerment)
  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";
  
  const maxFaves = 3;

// Fetching the quote data
  const fetchQuotes = async () => {
    try {
      setLoading(true);
    const request = await fetch(quotesUrl);
    const response = await request.json(); 
    setQuotes(response);
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


useEffect(() => {
    const favoriteQuotesString = JSON.stringify(favoriteQuotes);
    window.localStorage.setItem("favoriteQuotesString", favoriteQuotesString)
}, [favoriteQuotes]);


const handleCategoryChange = (e) => {
  setCategory(e.target.value);
}; 

const filteredQuotes = category !== "All" ? 
  quotes.filter((quote) => (quote.categories.includes(category))) : 
  quotes;

  const addToFavorites = (quoteId) => {
       
    const selectedQuote = quotes.find((quote)=> quote.id === quoteId )
    const alreadyFavorite = favoriteQuotes.find((favorite) => favorite.id === selectedQuote.id)
        
    if (alreadyFavorite) 
      {setMessageText("This quote is already in your favorites! Choose another.");
      setShowMessage(true);

      } else if (favoriteQuotes.length < maxFaves) {
      setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      setMessageText("Added to favorites!");
      setShowMessage(true);

      console.log(favoriteQuotes);

    } else {setMessageText("Max number of Favorite Quotes reached.  Please deleted one to add another.")
      setShowMessage(true);
    }
  };

  const removeMessage = () => {
    setShowMessage(false);
  };

  const removeFromFavorites = (quoteId) => {
    const updatedFavorites = favoriteQuotes.filter((quote) => quote.id !== quoteId);
    setFavoriteQuotes(updatedFavorites);
  };

    
  return (
    <div className='App'>
      {showMessage && <Message messageText={messageText} removeMessage={removeMessage}/>}
      <Header />
      <main>
      <FavoriteQuotes 
      favoriteQuotes={favoriteQuotes} 
      removeFromFavorites={removeFromFavorites} 
      maxFaves={maxFaves}/>
      {loading ? (<Loader/>) : 
      (<Quotes 
      filteredQuotes={filteredQuotes} 
      categories={categories} 
      category={category}
      handleCategoryChange={handleCategoryChange}
      addToFavorites={addToFavorites}
      favoriteQuotes={favoriteQuotes}
      />
      )}
      </main>
      <Footer />
    </div>
  );
}
export default App;
