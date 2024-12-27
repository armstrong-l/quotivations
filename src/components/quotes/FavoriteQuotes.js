import React from "react";
import FavoriteQuoteCard from "./FavoriteQuoteCard";

const FavoriteQuotes = ({favoriteQuotes, removeFromFavorites, maxFaves}) => {

return (
      <section className = "favorite-quotes">
        <div className = "wrapper quotes">
          <h3>Top 3 favorite quotes</h3>
          {favoriteQuotes.length > 0 && <ul>
            {favoriteQuotes.map((quote) => <FavoriteQuoteCard 
                key={quote.id} 
                quote={quote} 
                removeFromFavorites={removeFromFavorites}/>)}
                </ul>}
          <div className = "favorite-quotes-description">
            <p>You can add up to three favorites by selecting from the options below.<br/>
            once you choose, they will appear here.</p>
          </div>
        </div>
      </section>
)

};

export default FavoriteQuotes;