import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";

function DonatePage() {
    const [product] = React.useState({
        name: "Send Us a Dollar",
        price: 1.00,
    });

    function handleToken(token, addresses) {
        console.log({token, addresses})
    }

    return (
        <div className="container">
            <div className="product">
                <h1>{product.name}</h1>
                <h3>${product.price}</h3>
            </div>
            <StripeCheckout
                stripeKey='pk_test_51LUOIkDGthnbVTIgoPsAILWRIDpvkjSxzPjTFYemdhc4r7u5ekIlbdI14rwsj798DUuJX5PpFo2R6KpwnwWqUVlX006A466cgi'
                token={handleToken}  
             />
        </div>
    )
}

export default DonatePage;