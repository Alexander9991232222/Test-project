using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models.Interfaces;

namespace WebApplication2.Models
{
    public abstract class BaseController : ApiController
    {
        [NonAction]
        protected HttpResponseMessage Result<T>(IEntryResult<T> entry)
        {
            switch (entry.statusRequest)
            {
                case EStatus.Successful:
                    return Request.CreateResponse(HttpStatusCode.OK, entry.data);

                case EStatus.NotFound:
                    return Request.CreateResponse(HttpStatusCode.NotFound, entry.message);

                case EStatus.SqlError:
                    return Request.CreateResponse(HttpStatusCode.BadRequest, entry.message);

                default: 
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, entry.message);
            }
        }
    }
}