import { setEntree } from "./TransientState.js";

export const handleEntreeSelection = (changeEvent) => {
    if (changeEvent.target.name === "entrees") {
        const selectedEntreeId = parseInt(changeEvent.target.value);
        setEntree(selectedEntreeId);
    }
}

export const Entrees = async () => {
    const response = await fetch("http://localhost:8088/entrees");
    const entrees = await response.json();

    document.addEventListener("change", handleEntreeSelection);

    let entreeOptionsHTML = `<label for="entrees"><h2>Entree Choices</h2></label>`;

    entreeOptionsHTML += entrees.map(entree => {
        return `<input type="radio" name="entrees" value="${entree.id}">${entree.name}</input>`;
    }).join("");

    return entreeOptionsHTML
}