window.onload = function () {
    listarLaboratorios();
};

function filtrarLaboratorios() {
    let nombre = get("txtLaboratorio");
    if (nombre == "") {
        listarLaboratorios();
    } else {
        objLaboratorio.url = "Laboratorio/filtrarLaboratorios/?nombre=" + nombre;
        pintar(objLaboratorio);
    }

}

let objLaboratorio;

async function listarLaboratorios() {
    objLaboratorio = {
        url: "Laboratorio/listarLaboratorios",
        cabeceras: ["id Laboratorio", "Nombre", "Direccion", "Persona Contacto"],
        propiedades: ["idLaboratorio", "nombre", "direccion", "personaContacto"],
        divContenedorTabla: "divContenedorTabla",
        editar: true,
        eliminar: true,
        propiedadId: "idLaboratorio"
    }

    pintar(objLaboratorio);

}
function LimpiarLaboratorio() {
    LimpiarDatos("frmBusqueda");
    listarLaboratorios();
}


function GuardarLaboratorio() {
    let forma = document.getElementById("frmCrearLaboratorio"); // Usar el formulario del modal
    let frm = new FormData(forma);

    confirmacionCreacion("Guardar Nuevo Laboratorio", "Quiero guardar", function () {
        fetchPost("Laboratorio/GuardarLaboratorio", "text", frm, function (res) {
            listarLaboratorios();
            LimpiarDatos("frmCrearLaboratorio");

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
    fetchGet(`Laboratorio/recuperarLaboratorio/?idLaboratorio=${id}`, "json", function (res) {
        mostrarAlertaEliminar("Borrar el Laboratorio", `¿Desea eliminar el laboratorio: ${res.nombre}?`, function () {
            fetchGet("Laboratorio/EliminarLaboratorio/?idLaboratorio=" + id, "text", function (respt) {
                listarLaboratorios();
                Swal.fire({
                    title: "Eliminado!",
                    text: `El laboratorio "${res.nombre}" ha sido eliminado.`,
                    icon: "success"
                });
            });
        });
    });
}



function Editar(id) {
    let modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
    fetchGet(`Laboratorio/recuperarLaboratorio/?idLaboratorio=${id}`, "json", function (res) {
        if (res) {
            set("editid", res.idLaboratorio);
            set("editnombre", res.nombre);
            set("editdireccion", res.direccion);
            set("editpersonaContacto", res.personaContacto);
        }


    });
}


function GuardarCambioLaboratorios() {
    let forma = document.getElementById("frmEditar");
    let frm = new FormData(forma);

    confirmacionActualizacion("Actualizar Laboratorio", `¿Desea actualizar el laboratorio: ${document.getElementById("editnombre").value}?`, function () {
        fetchPost("Laboratorio/GuardarCambioLaboratorios", "text", frm, function (rspt) {
            listarLaboratorios();
            LimpiarDatos("frmEditar");

            Swal.fire({
                title: "Actualizado!",
                text: `El laboratorio ha sido actualizado.`,
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


