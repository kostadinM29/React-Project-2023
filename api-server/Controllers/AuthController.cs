using System.Security.Claims;

using api_server.Data.Models;
using api_server.Identity;
using api_server.Models;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api_server.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        private readonly IUserService userService;
        private readonly IJWTService jwtService;
        private readonly ILogger<AuthController> logger;

        public AuthController(IAuthService authService, IUserService userService, IJWTService jwtService, ILogger<AuthController> logger)
        {
            this.authService = authService;
            this.userService = userService;
            this.jwtService = jwtService;
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

                (int status, UserTokens? userTokens, string message) = await authService.Login(model);
                if (status is 0)
                {
                    return BadRequest(message);
                }

                UserRefreshTokens userRefreshTokens = new()
                {
                    RefreshToken = userTokens.RefreshToken,
                    UserName = model.Username,
                };

                userService.AddUserRefreshTokens(userRefreshTokens);

                return Ok(new { accessToken = userTokens?.AccessToken, refreshToken = userTokens?.RefreshToken });
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
                if (status is 0)
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

        [AllowAnonymous]
        [HttpGet]
        [Route("refresh-token")]
        public async Task<IActionResult> Refresh()
        {
            try
            {
                string? accessToken = Request.Cookies["accessToken"];
                string? refreshToken = Request.Cookies["refreshToken"];

                if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
                {
                    return Unauthorized("Invalid attempt!");
                }

                ApplicationUser? user = await jwtService.GetUserFromExpiredToken(accessToken);

                if (user is null)
                {
                    return Unauthorized("Invalid attempt!");
                }

                UserRefreshTokens? savedRefreshToken = userService.GetSavedRefreshTokens(user.UserName, refreshToken);

                if (savedRefreshToken is null || savedRefreshToken.RefreshToken != refreshToken)
                {
                    return Unauthorized("Invalid attempt!");
                }

                ClaimsIdentity? claimsIdentity = await userService.GetClaimsPrincipalFromUser(user);
                UserTokens? newJwtToken = jwtService.GenerateRefreshToken(claimsIdentity);

                if (newJwtToken is null)
                {
                    return Unauthorized("Invalid attempt!");
                }

                UserRefreshTokens tokensToSave = new()
                {
                    RefreshToken = newJwtToken.RefreshToken,
                    UserName = user.UserName,
                };

                userService.DeleteUserRefreshTokens(user.UserName, refreshToken);
                userService.AddUserRefreshTokens(tokensToSave);

                return Ok(new { accessToken = newJwtToken?.AccessToken, refreshToken = newJwtToken?.RefreshToken });
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}