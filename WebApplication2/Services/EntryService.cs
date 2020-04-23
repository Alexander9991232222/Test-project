using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
using System.Threading.Tasks;
using WebApplication2.Models.Interfaces;
using WebApplication2.Models;
using System.Web.Management;

namespace WebApplication2.Services
{
    public class EntryService<T> : IEntryService<T> where T : IEntry
    {
        protected string _nameTable = typeof(T).Name;
        protected readonly string _connectString = ConfigurationManager.ConnectionStrings["TestSqlBase"].ToString();
      
        public async Task<IEntryResult<IEnumerable<T>>> GetEntryListAsync()
        {
            string procedureName = $"Select{this._nameTable}s";
            return await RequestToBaseProcedur<IEnumerable<T>>(procedureName);
        }

        public async Task<IEntryResult<T>> AddAsync(T entry)
        {
            string procedureName = $"Add{this._nameTable}";
            return await RequestToBaseProcedur<T>(procedureName, entry);
        }

        public async Task<IEntryResult<T>> DeleteEntryAsync(T entry)
        {
            string procedureName = $"Delete{this._nameTable}";
            return await RequestToBaseProcedur<T>(procedureName, entry);
        }

        public async Task<IEntryResult<T>> UpdateEntryAsync(T entry)
        {
            string procedureName = $"Update{this._nameTable}";
            return await RequestToBaseProcedur<T>(procedureName, entry);
        }

        private async Task<IEntryResult<TResult>> RequestToBaseProcedur<TResult>(string proсedurName, T obj = default)
        {
            SqlConnection Conn = new SqlConnection(this._connectString);
            Conn.Open();

            try
            {
                if (Conn.State != ConnectionState.Open)
                    Conn.Open();

                SqlCommand command = new SqlCommand(proсedurName, Conn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                if (obj != null)
                {
                    command.Parameters.AddWithValue("@json", JsonConvert.SerializeObject(obj));
                }

                var result = JsonConvert.DeserializeObject<TResult>(Convert.ToString(await command.ExecuteScalarAsync()));
                return new EntryResult<TResult> { data = result, statusRequest = EStatus.Successful };
            }
            catch(SqlExecutionException sqlEx)
            {
                return new EntryResult<TResult> { message = sqlEx.Message, statusRequest = EStatus.SqlError };
            }
            catch (Exception ex)
            {
                return new EntryResult<TResult> { message = ex.Message, statusRequest = EStatus.NotSuccessful };
            }
            finally
            {
                Conn.Close();
            }
        }
    }
}