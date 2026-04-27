const API_URL = "http://localhost:5000/api/team";

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error("Backend no responde");
        }
        return response.json();
    })
    .then(data => {
        const status = document.getElementById("status");
        status.innerText = "Backend funcionando ✅";
        status.className = "status-ok";

        const tabla = document.getElementById("tabla");

        data.forEach(miembro => {
            const fila = document.createElement("tr");

            const estadoNormalizado = miembro.estado
                .toLowerCase()
                .replace(/\s+/g, "_");

            const estadosClases = {
                activo: "badge badge-ok",
                en_proceso: "badge badge-proceso",
                pendiente: "badge badge-pendiente",
                inactivo: "badge badge-error"
            };

            const claseEstado = estadosClases[estadoNormalizado] || "badge badge-default";

            fila.innerHTML = `
                <td>${miembro.nombre}</td>
                <td>${miembro.apellido}</td>
                <td>${miembro.legajo}</td>
                <td>${miembro.feature}</td>
                <td>${miembro.servicio}</td>
                <td><span class="${claseEstado}">${miembro.estado}</span></td>
            `;

            tabla.appendChild(fila);
        });
    })
    .catch(error => {
        const status = document.getElementById("status");
        status.innerText = "Backend caído ❌";
        status.className = "status-error";
        console.error(error);
    });