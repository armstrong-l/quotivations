import React from "react";
import FavoriteQuoteCard from "./FavoriteQuoteCard";

const FavoriteQuotes = ({favoriteQuotes, removeFromFavorites, maxFaves}) => {

    const remainingFavorites = maxFaves - favoriteQuotes.length;

return (
      <section className = "favorite-quotes">
        <div className = "wrapper quotes">
          <h3>Top 3 favorite quotes</h3>
          {favoriteQuotes.length > 0 && <ul>
            {favoriteQuotes.map((quote, index) => <FavoriteQuoteCard 
                key={quote.id} 
                listPosition={index + 1}
                quote={quote} 
                removeFromFavorites={removeFromFavorites}
                
                />)}
                </ul>}

                {remainingFavorites !== 0 && (
          <div className = "favorite-quotes-description">
            <p> You can add {remainingFavorites} more {remainingFavorites === 1 ? "quote" : "quotes"} to your top three favorites by selecting from the options below.
            </p>
            <br/>
            Once you choose, they will appear here.
          </div>
          )}
        </div>
      </section>
)

};

export default FavoriteQuotes;