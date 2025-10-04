import { setVegetable } from "./TransientState.js";

export const handleVegetableSelection = (changeEvent) => {
    if (changeEvent.target.name === "vegetables") {
        const selectedVegetableId = parseInt(changeEvent.target.value);
        setVegetable(selectedVegetableId);
    }
}

export const Veggies = async () => {
    const response = await fetch("http://localhost:8088/vegetables");
    const vegetables = await response.json();

    document.addEventListener("change", handleVegetableSelection);

    let vegetableOptionsHTML = `<label for="vegetables"><h2>Vegetable Choices</h2></label>`;

    vegetableOptionsHTML += vegetables.map(vegetable => {
        return `<input type="radio" name="vegetables" value="${vegetable.id}">${vegetable.type}</input>`;
    }).join("");

    return vegetableOptionsHTML
}
