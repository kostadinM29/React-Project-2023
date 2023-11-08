using api_server.Identity;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api_server.Controllers.Admin
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        [Route("test")]
        [Authorize(Roles = UserRoles.Admin)]
        public ActionResult Test()
        {
            return Ok();
        }
    }
}
