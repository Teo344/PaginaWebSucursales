window.onload = function () {
    listarMedicamentos();
};


let objMedicamento;

async function listarMedicamentos() {
    objMedicamento = {
        url: "Medicamento/listarMedicamentos",
        cabeceras: ["id Medicamento", "codigo", "nombre Medicamento", "laboratorio", "Tipo Medicamento", "Uso Medicamento"],
        propiedades: ["idMedicamento", "codigo", "nombreMedicamento", "tipoMedicamento", "nombreLaboratorio", "usoMedicamento", "contenido" ],
        editar: true,
        eliminar: true,
        propiedadId: "idMedicamento"
    }
    pintar(objMedicamento);
}

