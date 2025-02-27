using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class MedicamentoDAL:CadenaDAL
    {


        public List<MedicamentoCLS> listarMedicamentos()
        {
            List<MedicamentoCLS> lista = null;

            using (SqlConnection cn = new SqlConnection(this.cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT m.IIDMEDICAMENTO, m.CODIGO, m.NOMBREMEDICAMENTO,\r\ntm.NOMBRE as TIPO_MEDICAMENTO,\r\nl.NOMBRE as NOMBRE_LABORATORIO,\r\nm.USOMEDICAMENTO, m.CONTENIDO\r\nFROM Medicamento m \r\nINNER JOIN TipoMedicamento tm \r\nON m.IIDTIPOMEDICAMENTO = tm.IIDTIPOMEDICAMENTO\r\ninner join Laboratorio l\r\non m.IIDLABORATORIO=l.IIDLABORATORIO\r\nWHERE m.BHABILITADO = 1", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.Text;

                        SqlDataReader dr = cmd.ExecuteReader();


                        if (dr != null)
                        {
                            MedicamentoCLS omedicamentoCLS;
                            lista = new List<MedicamentoCLS>();
                            while (dr.Read())
                            {
                                omedicamentoCLS = new MedicamentoCLS();
                                omedicamentoCLS.idMedicamento = dr.IsDBNull(0) ? 0 : dr.GetInt32(0);
                                omedicamentoCLS.codigo = dr.IsDBNull(1) ? "" : dr.GetString(1);
                                omedicamentoCLS.nombreMedicamento = dr.IsDBNull(2) ? "" : dr.GetString(2);
                                omedicamentoCLS.tipoMedicamento = dr.IsDBNull(3) ? "" : dr.GetString(3);
                                omedicamentoCLS.nombreLaboratorio = dr.IsDBNull(4) ? "" : dr.GetString(4);
                                omedicamentoCLS.usoMedicamento = dr.IsDBNull(5) ? "" : dr.GetString(5);
                                omedicamentoCLS.contenido = dr.IsDBNull(6) ? "" : dr.GetString(6);

                                lista.Add(omedicamentoCLS);
                            }
                        }
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                    lista = null;
                    throw;

                }
            }
            return lista;

        }
    }
}
