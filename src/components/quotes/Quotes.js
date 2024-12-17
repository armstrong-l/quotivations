import React from "react";
import QuoteCard from "./QuoteCard";

function Quotes ({quotes}) {

    return (
        
        <section className = "all-quotes">
           <div className="quotes wrapper">  {quotes.map(quote => (<QuoteCard key={quote.id} quote={quote}/>))} </div>
         </section>);
         };
    


export default Quotes;


// quotes.map((quote) => { return(<QuoteCard key={quotes.id} quote={quotes.quote}/>) }</section></div>
//         </section> */}