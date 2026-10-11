
const totalPrice = document.querySelector(".total");

// Calculer le prix total du panier
function updateTotal() {
    const cards = document.querySelectorAll(".card");
    let total = 0;

    cards.forEach((card) => {
        const priceElement = card.querySelector(".unit-price");
        const quantityElement = card.querySelector(".quantity");

        if (!priceElement || !quantityElement) return;

        const price = parseFloat(
            priceElement.textContent.replace(",", ".")
        );
        const quantity = parseInt(quantityElement.textContent, 10);

        if (!Number.isNaN(price) && !Number.isNaN(quantity)) {
            total += price * quantity;
        }
    });

    if (totalPrice) {
        totalPrice.textContent = `${total} $`;
    }
}

// Gérer les clics sur les boutons du panier
document.addEventListener("click", function (event) {
    const button = event.target.closest(
        ".fa-plus-circle, .fa-minus-circle, .fa-trash-alt, .fa-heart"
    );

    if (!button) return;

    const card = button.closest(".card");
    if (!card) return;

    const quantityElement = card.querySelector(".quantity");

    // Augmenter la quantité
    if (button.classList.contains("fa-plus-circle")) {
        const quantity = parseInt(quantityElement.textContent, 10);
        quantityElement.textContent = quantity + 1;
        updateTotal();
    }

    // Diminuer la quantité sans passer sous zéro
    else if (button.classList.contains("fa-minus-circle")) {
        const quantity = parseInt(quantityElement.textContent, 10);

        if (quantity > 0) {
            quantityElement.textContent = quantity - 1;
        }

        updateTotal();
    }

    // Supprimer un produit du panier
    else if (button.classList.contains("fa-trash-alt")) {
        card.remove();
        updateTotal();
    }

    // Ajouter ou retirer un produit des favoris
    else if (button.classList.contains("fa-heart")) {
        const isLiked = button.classList.toggle("liked");
        button.style.color = isLiked ? "red" : "black";
    }
});

// Calculer le total dès le chargement de la page
updateTotal();
