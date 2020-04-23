using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication2.Models;
using WebApplication2.Services;

namespace WebApplication2.Controllers
{
    public class PersonsController : BaseController 
    {
        EntryService<Person> _entryService = new EntryService<Person>();

        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            return Result(await _entryService.GetEntryListAsync());
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody]Person value)
        {
            return Result(await _entryService.AddAsync(value));
        }

        [HttpPut]
        public async Task<HttpResponseMessage> Put([FromBody]Person value)
        {
            return Result(await _entryService.UpdateEntryAsync(value));
        }

        [HttpDelete]
        public async Task<HttpResponseMessage> Delete([FromBody]Person value)
        {
            return Result(await _entryService.DeleteEntryAsync(value));
        }
    }
}