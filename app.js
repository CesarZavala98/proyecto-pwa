const lista = document.querySelector("#lista");

window.addEventListener("load", () => {
    registerWS();
});

fetch("https://randomuser.me/api/?nat=us&results=10&seed=parangaricutirumicuaro")
    .then(response => response.json())
    .then(data => {

        const results = data.results;

        let html = "";
        results.forEach(user => {
            html += `
        <div class="card" style="width: 18rem; margin: 10px;">
            <div class="card-body">
                <img src="${user.picture.medium}" width="72" height="72"/>
                <h2>${user.name.first} ${user.name.last}</h2>
                <h4>${user.cell}</h4>
                <button class="btn btn-primary button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${user.id.value}" aria-expanded="false" aria-controls="collapse${user.id.value}">
                    Mostrar más información
                </button>

                <div id="collapse${user.id.value}" class="collapse">
                    <div>${user.email}</div>
                    <div>${user.location.state}, ${user.location.country}</div>
                    <div>${user.dob.age} años</div>
                </div>
            </div>
        </div>`
        });
        lista.innerHTML = html;
    });

async function registerWS() {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("../sw.js");
        }
        catch (error) {
            console.log("fallo en el registro del service worker");
            console.log(error);
        }
    }
}