document.getElementById("btnBuscar").addEventListener("click", function () {
    let query = document.getElementById("inputBuscar").value; // Obtener el valor del input
    let apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;

    // Realizar la solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.collection.items);
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
            document.getElementById("contenedor").innerHTML = `<p>Error al obtener datos.</p>`;
        });
});

function displayResults(items) {
    let container = document.getElementById("contenedor");
    container.innerHTML = ""; // Limpiar resultados anteriores

    if (items.length === 0) {
        container.innerHTML = `<p>No se encontraron resultados.</p>`;
        return;
    }

    items.forEach(item => {
        let data = item.data[0];
        let imgLink = item.links ? item.links[0].href : "https://via.placeholder.com/150"; // Si no hay imagen, usar un placeholder

        let resultItem = `
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${imgLink}" class="img-fluid rounded-start" alt="${data.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.description}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${data.date_created}</small></p>
              </div>
            </div>
          </div>
        </div>
        `;

        container.innerHTML += resultItem;
    });
}
