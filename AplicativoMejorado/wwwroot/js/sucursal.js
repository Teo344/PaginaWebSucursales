window.onload = function () {
    listarSucursales();
};
function filtrarSucursales() {
    let nombre = get("txtSucursales");
    if (nombre == "") {
        listarSucursales();
    } else {
        objSucursales.url = "Sucursal/filtrarSucursales/?nombre=" + nombre;
        pintar(objSucursales);
    }

}

let objSucursales;

async function listarSucursales() {
    objSucursales = {
        url: "Sucursal/listarSucursales",
        cabeceras: ["id Sucursal", "Nombre", "Direccion"],
        propiedades: ["idSucursal", "nombre", "direccion"],
        editar: true,
        eliminar: true,
        propiedadId: "idSucursal"
    }
    pintar(objSucursales);
}


function BuscarSucursal() {
    let forma = document.getElementById("frmBusqueda");

    let frm = new FormData(forma);

    fetchPost("Sucursal/filtrarSucursales", "json", frm, function (res) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(res);
    })
}

function LimpiarSucursal() {
    LimpiarDatos("frmGuardarSucursal");
    listarSucursales();
}


function GuardarSucursal() {
    let forma = document.getElementById("frmCrearSucursal"); // Usar el formulario del modal
    let frm = new FormData(forma);

    confirmacionCreacion("Guardar Nueva Sucursal", "Quiero guardar", function () {
        fetchPost("Sucursal/GuardarSucursal", "text", frm, function (res) {
            listarSucursales();
            LimpiarDatos("frmCrearSucursal");

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
    fetchGet(`Sucursal/recuperarSucursal/?idSucursal=${id}`, "json", function (res) {
        mostrarAlertaEliminar("Borrar La sucursal", `¿Desea eliminar la sucursal: ${res.nombre}?`, function () {
            fetchGet("Sucursal/EliminarSucursal/?idSucursal=" + id, "text", function (respt) {
                listarSucursales();
                Swal.fire({
                    title: "Eliminado!",
                    text: `La Sucursal "${res.nombre}" ha sido eliminado.`,
                    icon: "success"
                });
            });
        });
    });
}



function Editar(id) {
    let modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
    fetchGet(`Sucursal/recuperarSucursal/?idSucursal=${id}`, "json", function (res) {
        if (res) {
            set("editid", res.idSucursal);
            set("editnombre", res.nombre);
            set("editdireccion", res.direccion);
        }


    });
}


function GuardarCambioSucursal() {
    let forma = document.getElementById("frmEditar");
    let frm = new FormData(forma);

    confirmacionActualizacion("Actualizar Sucursal", `¿Desea actualizar la Sucursal: ${document.getElementById("editnombre").value}?`, function () {
        fetchPost("Sucursal/GuardarCambioSucursal", "text", frm, function (rspt) {
            listarSucursales();
            LimpiarDatos("frmEditar");

            Swal.fire({
                title: "Actualizado!",
                text: `La Sucursal ha sido actualizado.`,
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