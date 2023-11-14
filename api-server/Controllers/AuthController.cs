using api_server.Identity;
using api_server.Models;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Mvc;

namespace api_server.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly ILogger<AuthController> logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            this.authService = authService;
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

                (int status, UserTokens? userTokens,string message) = await authService.Login(model);
                if (status == 0)
                {
                    return BadRequest(message);
                }

                return Ok(new { accessToken = userTokens?.AccessToken , refreshToken = userTokens?.RefreshToken });
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

                string role = model.Username.Contains("admin") 
                    ? UserRoles.Admin 
                    : UserRoles.User;

                (int status, string message) = await authService.Register(model, role);
                if (status == 0)
                {
                    return BadRequest(message);
                }

                return CreatedAtAction(nameof(Register), model);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
