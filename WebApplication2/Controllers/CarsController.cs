using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication2.Models;
using WebApplication2.Services;

namespace WebApplication2.Controllers
{
    public class CarsController : BaseController
    {
        EntryService<Car> _entryService = new EntryService<Car>();

        [HttpGet]
        public async Task<HttpResponseMessage> Get()
        {
            return Result(await _entryService.GetEntryListAsync());
        }

        [HttpGet]
        [Route("api/cars/getmodels")]
        public async Task<HttpResponseMessage> GetModels()
        {
            return Result(await new EntryService<CarModel>().GetEntryListAsync());
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody]Car value)
        {
            return Result(await _entryService.AddAsync(value));
        }

        [HttpPut]
        public async Task<HttpResponseMessage> Put([FromBody]Car value)
        {
           return Result(await _entryService.UpdateEntryAsync(value));
        }

        [HttpDelete]
        public async Task<HttpResponseMessage> Delete([FromBody]Car value)
        {
            return Result(await _entryService.DeleteEntryAsync(value));
        }
    }
}