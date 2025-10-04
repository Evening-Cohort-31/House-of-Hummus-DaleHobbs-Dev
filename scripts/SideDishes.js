import { setSide } from "./TransientState.js";

export const handleSideSelection = (changeEvent) => {
    if (changeEvent.target.name === "sides") {
        const selectedSideId = parseInt(changeEvent.target.value);
        setSide(selectedSideId);
    }
}

export const Sides = async () => {
    const response = await fetch("http://localhost:8088/sides");
    const sides = await response.json();

    document.addEventListener("change", handleSideSelection);

    let sideOptionsHTML = `<label for="sides"><h2>Side Choices</h2></label>`;

    sideOptionsHTML += sides.map(side => {
        return `<input type="radio" name="sides" value="${side.id}">${side.title}</input>`;
    }).join("");

    return sideOptionsHTML
}
