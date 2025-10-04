const transientState = {
    entreeId: null,
    vegetableId: null,
    sideId: null
};

export const setEntree = (id) => {
    transientState.entreeId = id;
    console.log("Transient State:", transientState);
};

export const setVegetable = (id) => {
    transientState.vegetableId = id;
    console.log("Transient State:", transientState);
};

export const setSide = (id) => {
    transientState.sideId = id;
    console.log("Transient State:", transientState);
};

export const getTransientState = () => {
    return { ...transientState };
};

const calculateTotalCost = async (entreeId, vegetableId, sideId) => {
    const entreeResponse = await fetch(`http://localhost:8088/entrees/${entreeId}`);
    const entree = await entreeResponse.json();

    const vegetableResponse = await fetch(`http://localhost:8088/vegetables/${vegetableId}`);
    const vegetable = await vegetableResponse.json();

    const sideResponse = await fetch(`http://localhost:8088/sides/${sideId}`);
    const side = await sideResponse.json();

    const totalCost = Number((entree.price + vegetable.price + side.price).toFixed(2));

    return totalCost;
}

const resetTransientState = () => {
    transientState.entreeId = null;
    transientState.vegetableId = null;
    transientState.sideId = null;
};

export const placeOrder = async () => {
    const { entreeId, vegetableId, sideId } = transientState;

    if (entreeId && vegetableId && sideId) {
        const totalCost = await calculateTotalCost(entreeId, vegetableId, sideId);

        const orderToSendToAPI = {
            entreeId,
            vegetableId,
            sideId,
            timestamp: Date.now(),
            totalCost
        };

        const postPurchase = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderToSendToAPI)
        };

        try {
            const response = await fetch("http://localhost:8088/purchases", postPurchase);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const newPurchase = await response.json();
            console.log("Order placed successfully:", newPurchase);

            resetTransientState();

            const customEvent = new CustomEvent("stateChanged");
            document.dispatchEvent(customEvent);

            return { success: true, purchase: newPurchase };

        } catch (error) {
            console.error("Error placing order:", error);
        }
    } else {
        console.error("Incomplete order information");
    }
};
