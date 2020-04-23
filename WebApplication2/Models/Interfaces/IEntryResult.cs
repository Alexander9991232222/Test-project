using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models.Interfaces
{
    public interface IEntryResult<T>
    {
        string message { get; set; }
        T data { get; set; }
        EStatus statusRequest { get; set; }
    }

    public enum EStatus
    {
        Successful,
        NotSuccessful,
        SqlError,
        NotFound
    }
}