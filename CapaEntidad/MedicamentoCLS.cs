using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class MedicamentoCLS
    {
        public int idMedicamento { get; set; }

        public string codigo { get; set; }

        public string nombreMedicamento { get; set; }

        public string tipoMedicamento { get; set; }

        public string nombreLaboratorio { get; set; }

        public string usoMedicamento { get; set; }

        public string contenido { get; set; }

    }
}