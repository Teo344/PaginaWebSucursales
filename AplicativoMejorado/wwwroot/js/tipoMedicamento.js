window.onload = function () {
    listarTipoMedicamento();
};
function filtrarTipoMedicamento() {
    let nombre = get("txtTipoMedicamentos");
    if (nombre == "") {
        listarTipoMedicamento();
    } else {
        obTipoMedicamento.url = "TipoMedicamento/filtrarTipoMedicamento/?nombre=" + nombre;
        pintar(objTipoMedicamento);
    }

}

let objSucursales;

async function listarTipoMedicamento() {
    objTipoMedicamento = {
        url: "TipoMedicamento/listarTipoMedicamento",
        cabeceras: ["id Tipo Medicamento", "Nombre", "Descripcion"],
        propiedades: ["idTipoMedicamento", "nombre", "descripcion"],
        editar: true,
        eliminar: true,
        propiedadId: "idTipoMedicamento"
    }
    pintar(objTipoMedicamento);
}



function LimpiarTipoMedicamento() {
    LimpiarDatos("frmGuardarTipoMedicamento");
    listarTipoMedicamento();
}


function GuardarTipoMedicamento() {
    let forma = document.getElementById("frmCrearTipoMedicamento"); // Usar el formulario del modal
    let frm = new FormData(forma);

    confirmacionCreacion("Guardar Nuevo Tipo de Medicamento", "Quiero guardar", function () {
        fetchPost("TipoMedicamento/GuardarTipoMedicamento", "text", frm, function (res) {
            listarTipoMedicamento();
            LimpiarDatos("frmCrearTipoMedicamento");

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





function Eliminar(id) {
    fetchGet(`TipoMedicamento/recuperarTipoMedicamento/?idTipoMedicamento=${id}`, "json", function (res) {
        mostrarAlertaEliminar("Borrar el Medicamento", `¿Desea eliminar el medicamento: ${res.nombre}?`, function () {
            fetchGet("TipoMedicamento/EliminarTipoMedicamento/?idTipoMedicamento=" + id, "text", function (respt) {
                listarTipoMedicamento();
                Swal.fire({
                    title: "Eliminado!",
                    text: `El tipo de medicamento"${res.nombre}" ha sido eliminado.`,
                    icon: "success"
                });
            });
        });
    });
}



function Editar(id) {
    let modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
    fetchGet(`TipoMedicamento/recuperarTipoMedicamento/?idTipoMedicamento=${id}`, "json", function (res) {
        if (res) {
            set("editid", res.idTipoMedicamento);
            set("editnombre", res.nombre);
            set("editdescripcion", res.descripcion);
        }


    });
}


function GuardarCambioTipoMedicamento() {
    let forma = document.getElementById("frmEditar");
    let frm = new FormData(forma);

    confirmacionActualizacion("Actualizar Tipo Medicamento", `¿Desea actualizar el tipo de medicamento: ${document.getElementById("editnombre").value}?`, function () {
        fetchPost("TipoMedicamento/GuardarCambioTipoMedicamento", "text", frm, function (rspt) {
            listarTipoMedicamento();
            LimpiarDatos("frmEditar");

            Swal.fire({
                title: "Actualizado!",
                text: `El tipo medicamento ha sido actualizado.`,
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