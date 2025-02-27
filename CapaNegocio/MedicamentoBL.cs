using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class MedicamentoBL
    {
        public List<MedicamentoCLS> listarMedicamentos()
        {
            MedicamentoDAL obj = new MedicamentoDAL();
            return obj.listarMedicamentos();
        }


        public int GuardarMedicamento(MedicamentoCLS objMedicamento)
        {
            MedicamentoDAL objDAL = new MedicamentoDAL();
            return objDAL.GuardarMedicamento(objMedicamento);
        }


        public int EliminarMedicamento(int idMedicamento)
        {
            MedicamentoDAL objDAL = new MedicamentoDAL();
            return objDAL.EliminarMedicamento(idMedicamento);
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
