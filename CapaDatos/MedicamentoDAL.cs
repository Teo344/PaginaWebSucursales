using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data;
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

        public int EliminarMedicamento(int idMedicamento)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("UPDATE Medicamento SET BHABILITADO = 0 WHERE IIDMEDICAMENTO = @idMedicamento", cn))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@idMedicamento", idMedicamento);

                        rpta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception)
                {
                    rpta = 0;
                    throw;
                }
            }
            return rpta;
        }

        public List<TipoMedicamentoCLS> ObtenerTiposMedicamentos()
        {
            List<TipoMedicamentoCLS> lista = new List<TipoMedicamentoCLS>();
            using (SqlConnection cn = new SqlConnection(this.cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT IIDTIPOMEDICAMENTO, NOMBRE FROM TipoMedicamento WHERE BHABILITADO = 1", cn))
                    {
                        cmd.CommandType = CommandType.Text;
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            TipoMedicamentoCLS tipoMedicamento = new TipoMedicamentoCLS
                            {
                                idTipoMedicamento = dr.GetInt32(0),
                                nombre = dr.GetString(1)
                            };
                            lista.Add(tipoMedicamento);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error en ObtenerTiposMedicamentos: {ex.Message}");
                }
            }
            return lista;
        }

        public List<LaboratorioCLS> ObtenerLaboratorios()
        {
            List<LaboratorioCLS> lista = new List<LaboratorioCLS>();
            using (SqlConnection cn = new SqlConnection(this.cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT IIDLABORATORIO, NOMBRE FROM Laboratorio WHERE BHABILITADO = 1", cn))
                    {
                        cmd.CommandType = CommandType.Text;
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {
                            LaboratorioCLS laboratorio = new LaboratorioCLS
                            {
                                idLaboratorio = dr.GetInt32(0),
                                nombre = dr.GetString(1)
                            };
                            lista.Add(laboratorio);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error en ObtenerLaboratorios: {ex.Message}");
                }
            }
            return lista;
        }

        public int GuardarMedicamento(MedicamentoCLS objMedicamento)
        {
            int respuesta = 0;
            using (SqlConnection cn = new SqlConnection(this.cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspGuardarMedicamento", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@iidmedicamento", 0);
                        cmd.Parameters.AddWithValue("@codigo", objMedicamento.codigo);
                        cmd.Parameters.AddWithValue("@nombremedicamento", objMedicamento.nombreMedicamento);
                        cmd.Parameters.AddWithValue("@iidlaboratorio", objMedicamento.idLaboratorio);
                        cmd.Parameters.AddWithValue("@iidtipomedicamento", objMedicamento.idTipoMedicamento);
                        cmd.Parameters.AddWithValue("@usomedicamento", objMedicamento.usoMedicamento);
                        cmd.Parameters.AddWithValue("@contenido", objMedicamento.contenido);
                        respuesta = cmd.ExecuteNonQuery();
                    }
                }
                catch (SqlException sqlEx)
                {
                    Console.WriteLine($"SQL Error en GuardarMedicamento: {sqlEx.Message}");
                    respuesta = 0;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error en GuardarMedicamento: {ex.Message}");
                    respuesta = 0;
                }
            }
            return respuesta;
        }

        public MedicamentoCLS recuperarMedicamento(int idMedicamento)
        {
            MedicamentoCLS oMedicamentoCLS = null;

            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT IIDMEDICAMENTO, CODIGO, NOMBREMEDICAMENTO, IIDTIPOMEDICAMENTO, IIDLABORATORIO, USOMEDICAMENTO, CONTENIDO FROM Medicamento WHERE BHABILITADO = 1 AND IIDMEDICAMENTO = @idMedicamento", cn))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@idMedicamento", idMedicamento);
                        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.SingleResult);

                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                oMedicamentoCLS = new MedicamentoCLS
                                {
                                    idMedicamento = dr.IsDBNull(dr.GetOrdinal("IIDMEDICAMENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("IIDMEDICAMENTO")),
                                    codigo = dr.IsDBNull(dr.GetOrdinal("CODIGO")) ? string.Empty : dr.GetString(dr.GetOrdinal("CODIGO")),
                                    nombreMedicamento = dr.IsDBNull(dr.GetOrdinal("NOMBREMEDICAMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("NOMBREMEDICAMENTO")),
                                    idTipoMedicamento = dr.IsDBNull(dr.GetOrdinal("IIDTIPOMEDICAMENTO")) ? 0 : dr.GetInt32(dr.GetOrdinal("IIDTIPOMEDICAMENTO")),
                                    idLaboratorio = dr.IsDBNull(dr.GetOrdinal("IIDLABORATORIO")) ? 0 : dr.GetInt32(dr.GetOrdinal("IIDLABORATORIO")),
                                    usoMedicamento = dr.IsDBNull(dr.GetOrdinal("USOMEDICAMENTO")) ? string.Empty : dr.GetString(dr.GetOrdinal("USOMEDICAMENTO")),
                                    contenido = dr.IsDBNull(dr.GetOrdinal("CONTENIDO")) ? string.Empty : dr.GetString(dr.GetOrdinal("CONTENIDO"))
                                };
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error en recuperarMedicamento: {ex.Message}");
                }
            }

            return oMedicamentoCLS;
        }

        public int GuardarCambioMedicamento(MedicamentoCLS objMedicamento)
        {
            int rpta = 0;

            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("UPDATE Medicamento SET NOMBREMEDICAMENTO = @nombre, CODIGO = @codigo , IIDLABORATORIO = @idLaboratorio , IIDTIPOMEDICAMENTO = @idTipoMedicamento , USOMEDICAMENTO = @usoMedicamento, CONTENIDO = @contenido WHERE IIDMEDICAMENTO = @idMedicamento", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.Text;
                        cmd.Parameters.AddWithValue("@idMedicamento", objMedicamento.idMedicamento);
                        cmd.Parameters.AddWithValue("@codigo", objMedicamento.codigo);
                        cmd.Parameters.AddWithValue("@nombre", objMedicamento.nombreMedicamento);
                        cmd.Parameters.AddWithValue("@idLaboratorio", objMedicamento.nombreLaboratorio);
                        cmd.Parameters.AddWithValue("@idTipoMedicamento", objMedicamento.tipoMedicamento);
                        cmd.Parameters.AddWithValue("@usoMedicamento", objMedicamento.usoMedicamento);
                        cmd.Parameters.AddWithValue("@contenido", objMedicamento.contenido);

                        rpta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception)
                {
                    rpta = 0;
                    throw;
                }
            }
            return rpta;
        }






    }
}
