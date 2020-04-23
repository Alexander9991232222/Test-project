using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication2.Models;

namespace WebApplication2.Models.Interfaces
{
    public interface IEntryService<T>
    {
        Task<IEntryResult<IEnumerable<T>>> GetEntryListAsync();
        Task<IEntryResult<T>> UpdateEntryAsync(T entry);
        Task<IEntryResult<T>> DeleteEntryAsync(T entry);
        Task<IEntryResult<T>> AddAsync(T entry);
    }
}