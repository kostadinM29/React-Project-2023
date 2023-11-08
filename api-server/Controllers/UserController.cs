using api_server.Identity;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace api_server.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ILogger<UserController> logger;

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            this.userService = userService;
            this.logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginRequestModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid payload!");
                }

                (int status, string message) = await userService.Login(model);
                if (status == 0)
                {
                    return BadRequest(message);
                }

                return Ok(message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid payload!");
                }

                string userRoleGambaResult = RoleGamba();
                (int status, string message) = await userService.Register(model, userRoleGambaResult);
                if (status == 0)
                {
                    return BadRequest(message);
                }

                return CreatedAtAction(nameof(Register),model);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private static string RoleGamba()
        {
            Random random = new();

            bool isAdmin = random.Next(2) == 0;

            return isAdmin ? UserRoles.Admin : UserRoles.User;
        }
    }
}
