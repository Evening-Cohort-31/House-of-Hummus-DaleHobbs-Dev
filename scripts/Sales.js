export const Sales = async () => {
    const sales = await fetch("http://localhost:8088/purchases").then(res => res.json())

    let salesHTML = sales.map(order => {
        return `<div class="order" id="order-${order.id}">
            <h3>Order #${order.id}</h3>
            <p>Total: $${order.totalCost.toFixed(2)}</p>
        </div>`
    }).join("")

    return salesHTML
}

