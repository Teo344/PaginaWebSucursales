window.onload = function () {
    listarMedicamentos();
    cargarTiposMedicamentos();
    cargarLaboratorios();
};


let objMedicamento;

async function listarMedicamentos() {
    objMedicamento = {
        url: "Medicamento/listarMedicamentos",
        cabeceras: ["id Medicamento", "codigo", "nombre Medicamento", "laboratorio", "Tipo Medicamento", "Uso Medicamento","Contenido"],
        propiedades: ["idMedicamento", "codigo", "nombreMedicamento", "nombreLaboratorio", "tipoMedicamento", "usoMedicamento", "contenido" ],
        editar: true,
        eliminar: true,
        propiedadId: "idMedicamento"
    }
    pintar(objMedicamento);
}

function LimpiarMedicamento() {
    LimpiarDatos("frmBusqueda");
    listarMedicamentos();
}

function cargarTiposMedicamentos() {
    fetch("/Medicamento/ObtenerTiposMedicamentos")
        .then(response => response.json())
        .then(data => {
            let selects = [
                document.getElementById("selectTipoMedicamento"),
                document.getElementById("editselectTipoMedicamento")
            ];

            selects.forEach(select => {
                if (select) {
                    select.innerHTML = ""; // Limpiar opciones previas
                    data.forEach(item => {
                        let option = document.createElement("option");
                        option.value = item.idTipoMedicamento;
                        option.text = item.nombre;
                        select.add(option);
                    });
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

function cargarLaboratorios() {
    fetch("/Medicamento/ObtenerLaboratorios")
        .then(response => response.json())
        .then(data => {
            let selects = [
                document.getElementById("selectLaboratorio"),
                document.getElementById("editselectLaboratorio")
            ];

            selects.forEach(select => {
                if (select) {
                    select.innerHTML = ""; // Limpiar opciones previas
                    data.forEach(item => {
                        let option = document.createElement("option");
                        option.value = item.idLaboratorio;
                        option.text = item.nombre;
                        select.add(option);
                    });
                }
            });
        })
        .catch(error => console.error('Error:', error));
}





function GuardarMedicamento() {
    let forma = document.getElementById("frmCrearMedicamento");
    let frm = new FormData(forma);

    confirmacionCreacion("Guardar Nuevo Medicamento", "Quiero guardar", function () {
        fetchPost("Medicamento/GuardarMedicamento", "text", frm, function (res) {
            listarMedicamentos();
            LimpiarDatos("frmCrearMedicamento");

            // Cerrar el modal correctamente
            let modalElement = document.getElementById("insertModal");
            let modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                modal.hide();
            }

            // Eliminar manualmente el fondo oscuro si persiste
            document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());

            // Mostrar el toast de éxito
            let toast = new bootstrap.Toast(document.getElementById("toastSuccess"));
            toast.show();
        });
    });


}

function Editar(id) {
    let modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
    fetchGet(`Medicamento/recuperarMedicamento/?idMedicamento=${id}`, "json", function (data) { 
            if (data) {
                set("editid", data.idMedicamento);
                set("editcodigo", data.codigo);
                set("editnombreMedicamento", data.nombreMedicamento);
                set("editselectTipoMedicamento", data.idTipoMedicamento);
                set("editselectLaboratorio", data.idLaboratorio);
                set("editusoMedicamento", data.usoMedicamento);
                set("editcontenido", data.contenido);
            }
    })


}



function Eliminar(id) {
    fetchGet(`Medicamento/recuperarMedicamento/?idMedicamento=${id}`, "json", function (res) {
        mostrarAlertaEliminar("Borrar el Medicamento", `¿Desea eliminar el medicamento: ${res.nombreMedicamento}?`, function () {
            fetchGet(`Medicamento/EliminarMedicamento/?idMedicamento=${id}`, "text", function (respt) {
                listarMedicamentos();
                Swal.fire({
                    title: "Eliminado!",
                    text: `El medicamento"${ res.nombreMedicamento }" ha sido eliminado.`,
                    icon: "success"
                });
            });
        });
    });
}


function GuardarCambioMedicamento() {
    let forma = document.getElementById("frmEditar");
    let frm = new FormData(forma);

    for (let pair of frm.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    confirmacionActualizacion("Actualizar Medicamento", `¿Desea actualizar el tipo de medicamento: ${document.getElementById("editnombreMedicamento").value}?`, function () {
        fetchPost("Medicamento/GuardarCambioMedicamento", "text", frm, function (rspt) {
            listarMedicamentos();
            LimpiarDatos("frmEditar");

            Swal.fire({
                title: "Actualizado!",
                text: `El medicamento ha sido actualizado.`,
                icon: "success"
            });

            let modalElement = document.getElementById("editModal");
            let modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.hide();


            document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());

            let toast = new bootstrap.Toast(document.getElementById("toastSuccessEdit"));
            toast.show();
        });
    });
}