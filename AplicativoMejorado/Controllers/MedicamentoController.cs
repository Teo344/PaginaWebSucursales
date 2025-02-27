using CapaDatos;
using CapaEntidad;
using Microsoft.AspNetCore.Mvc;

namespace AplicativoMejorado.Controllers
{
    public class MedicamentoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<MedicamentoCLS> listarMedicamentos()
        {
            MedicamentoDAL obj = new MedicamentoDAL();
            return obj.listarMedicamentos();
        }

        public int GuardarMedicamento(MedicamentoCLS objMedicamento)
        {
            MedicamentoDAL obj = new MedicamentoDAL();
            return obj.GuardarMedicamento(objMedicamento);
        }


        public int EliminarMedicamento(int idMedicamento)
        {
            MedicamentoDAL objDAL = new MedicamentoDAL();
            return objDAL.EliminarMedicamento(idMedicamento);
        }

        public List<TipoMedicamentoCLS> ObtenerTiposMedicamentos()
        {
            MedicamentoDAL obj = new MedicamentoDAL();
            return obj.ObtenerTiposMedicamentos();
        }

        public List<LaboratorioCLS> ObtenerLaboratorios()
        {
            MedicamentoDAL obj = new MedicamentoDAL();
            return obj.ObtenerLaboratorios();
        }

        public MedicamentoCLS recuperarMedicamento(int idMedicamento)
        {
            MedicamentoDAL obj = new MedicamentoDAL();
            return obj.recuperarMedicamento(idMedicamento);
        }

        public int GuardarCambioMedicamento(MedicamentoCLS objMedicamento)
        {
            MedicamentoDAL obj = new MedicamentoDAL();
            return obj.GuardarCambioMedicamento(objMedicamento);
        }

    }
}
