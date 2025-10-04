import { Sales } from "./Sales.js"
import { Entrees } from "./Entrees.js"
import { Veggies } from "./Vegetables.js"
import { Sides } from "./SideDishes.js"
import { handlePurchaseClick } from "./Order.js"

document.addEventListener("click", handlePurchaseClick);

export const FoodTruck = async () => {
    const entreeHTML = await Entrees()
    const vegetableHTML = await Veggies()
    const sideHTML = await Sides()
    const salesHTML = await Sales()

    return `
        <header class="header">
            <img src="./images/hummus.png" class="logo" />
            <h1 class="title">Laura Kathryn's House of Hummus</h1>
        </header>

        <section class="entrees">
            ${entreeHTML}
        </section>

        <section class="vegetables">
            ${vegetableHTML}
        </section>

        <section class="sides">
            ${sideHTML}
         </section>
   
        <article class="purchase">
            <button id="purchase">Purchase Combo</button>
        </article>

        <article class="customerOrders">
            <h2>Monthly Sales</h2>
            ${salesHTML}
        </article>

    `
}
