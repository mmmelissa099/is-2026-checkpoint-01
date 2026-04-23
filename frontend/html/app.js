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

            let claseEstado = "";
            let textoEstado = "";

            switch (miembro.estado) {
                case "activo":
                    claseEstado = "badge badge-ok";
                    textoEstado = "Activo";
                    break;
                case "en_proceso":
                    claseEstado = "badge badge-proceso";
                    textoEstado = "En proceso";
                    break;
                case "pendiente":
                    claseEstado = "badge badge-pendiente";
                    textoEstado = "Pendiente";
                    break;
                default:
                    claseEstado = "badge badge-error";
                    textoEstado = "Inactivo";
            }

            fila.innerHTML = `
                <td>${miembro.nombre}</td>
                <td>${miembro.apellido}</td>
                <td>${miembro.legajo}</td>
                <td>${miembro.feature}</td>
                <td>${miembro.servicio}</td>
                <td><span class="${claseEstado}">${textoEstado}</span></td>
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