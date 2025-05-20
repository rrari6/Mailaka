
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Ajouter un produit
function ajouterAuPanier(nom, prix, image) {
  const produitExistant = panier.find(p => p.nom === nom);
  if (produitExistant) {
    produitExistant.quantite += 1;
  } else {
    panier.push({ nom, prix, image, quantite: 1 });
  }
  localStorage.setItem("panier", JSON.stringify(panier));
  alert("Produit ajouté au panier !");
}

// Afficher les produits sur la page panier
function afficherPanier() {
  const conteneur = document.getElementById("panier-produits");
  const totalElement = document.getElementById("panier-total");
  conteneur.innerHTML = "";
  let total = 0;

  if (panier.length === 0) {
    conteneur.innerHTML = "<p>Votre panier est vide.</p>";
    totalElement.textContent = "0 Ar";
    return;
  }

  panier.forEach((produit, index) => {
    const article = document.createElement("div");
    article.className = "produit-panier";
    article.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}">
      <div class="infos">
        <h3>${produit.nom}</h3>
        <p>Prix : ${produit.prix} Ar</p>
        <p>Quantité : ${produit.quantite}</p>
        <button onclick="supprimerProduit(${index})">Supprimer</button>
      </div>
    `;
    conteneur.appendChild(article);
    total += produit.prix * produit.quantite;
  });

  totalElement.textContent = total.toLocaleString() + " Ar";
}

// Supprimer un produit du panier
function supprimerProduit(index) {
  panier.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
}

// Vider complètement le panier
function viderPanier() {
  panier = [];
  localStorage.removeItem("panier");
  afficherPanier();
}
