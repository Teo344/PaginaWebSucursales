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




function BuscarTipoMedicamento() {
    let forma = document.getElementById("frmGuardarTipoMedicamento");

    let frm = new FormData(forma);

    fetchPost("TipoMedicamento/filtrarTipoMedicamento", "json", frm, function (res) {
        document.getElementById("divContenedorTabla").innerHTML = generarTabla(res);
    })
}

function LimpiarTipoMedicamento() {
    LimpiarDatos("frmGuardarTipoMedicamento");
    listarTipoMedicamento();
}


function GuardarTipoMedicamento() {
    let forma = document.getElementById("frmGuardarTipoMedicamento");
    let frm = new FormData(forma);
    fetchPost("TipoMedicamento/GuardarTipoMedicamento", "text", frm, function (res) {
        listarTipoMedicamento();
        LimpiarDatos("frmGuardarTipoMedicamento");

    })
}


function Editar(id) {
    fetchGet("TipoMedicamento/recuperarTipoMedicamento/?idTipoMedicamento=" + id, "json", function (data) {
        setN("idTipoMedicamento", data.idTipoMedicamento);
        setN("nombre", data.nombre);
        setN("descripcion", data.descripcion);
    }); 

}


function GuardarCambiosTipoMedicamento() {
    let forma = document.getElementById("frmGuardarTipoMedicamento");
    let frm = new FormData(forma);
    fetchPost("TipoMedicamento/GuardarCambiosTipoMedicamento", "text", frm, function (res) {
        listarTipoMedicamento();
        LimpiarDatos("frmGuardarTipoMedicamento");

    })
}

function Eliminar(id) {
    if (!confirm("¿Está seguro de eliminar este tipo de medicamento?")) {
        return;
    }

    fetchGet("TipoMedicamento/EliminarTipoMedicamento/?idTipoMedicamento=" + id, "text", function (res) {
        listarTipoMedicamento();
    });
}
