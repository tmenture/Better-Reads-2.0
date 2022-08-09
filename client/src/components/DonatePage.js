import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "./donate.css";

function DonatePage() {
    const [product] = React.useState({
        name: "Send Us a Dollar",
        price: 1.00,
    });

    function handleToken(token, addresses) {
        console.log({token, addresses})
    };

    async function handleToken(token, addresses) {
        const response = await axios.post(
          "/checkout",
          { token, product }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
          toast("Success! Check email for details", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
      };
    

    return (
        <div className="container">
            <div className="product">
                <h1>{product.name}</h1>
                <h3>${product.price}</h3>
            </div>
            <StripeCheckout
                stripeKey='pk_test_51LUOIkDGthnbVTIgoPsAILWRIDpvkjSxzPjTFYemdhc4r7u5ekIlbdI14rwsj798DUuJX5PpFo2R6KpwnwWqUVlX006A466cgi'
                token={handleToken}  
                billingAddress
                amount= {product.price * 100}
             />
        </div>
    )
}

export default DonatePage;