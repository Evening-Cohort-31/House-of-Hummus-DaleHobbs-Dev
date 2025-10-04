import { placeOrder } from "./TransientState.js";

export const handlePurchaseClick = async (clickEvent) => {
    if (clickEvent.target.id === "purchase") {
        const result = await placeOrder();
        if (result.success) {
            alert("Thank you for your purchase! Your total is $" + result.purchase.totalCost.toFixed(2));
        } else {
            alert("There was an issue with your purchase. Please try again.");
        }
    }
}