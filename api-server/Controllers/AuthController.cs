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
    [AllowAnonymous]
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
                    RefreshToken = userTokens!.RefreshToken,
                    UserName = model.Username!,
                };

                await userService.AddUserRefreshTokens(userRefreshTokens);

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

                (int status, UserTokens? userTokens, string message) = await authService.Register(model, role);
                if (status is 0)
                {
                    return BadRequest(message);
                }

                return Ok(new { accessToken = userTokens?.AccessToken, refreshToken = userTokens?.RefreshToken });
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

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

                ApplicationUser? user = await jwtService.GetUserFromToken(accessToken, false);

                if (user is null)
                {
                    return Unauthorized("Invalid attempt!");
                }

                UserRefreshTokens? savedRefreshToken = await userService.GetSavedRefreshTokens(user.UserName!, refreshToken);

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
                    UserName = user.UserName!,
                };

                await userService.DeleteUserRefreshTokens(user.UserName!, refreshToken);
                await userService.AddUserRefreshTokens(tokensToSave);

                return Ok(new { accessToken = newJwtToken?.AccessToken, refreshToken = newJwtToken?.RefreshToken });
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                string? accessToken = Request.Cookies["accessToken"];
                string? refreshToken = Request.Cookies["refreshToken"];

                if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
                {
                    return Unauthorized("Invalid attempt!");
                }

                ApplicationUser? user = await jwtService.GetUserFromToken(accessToken, false);

                if (user is null)
                {
                    return BadRequest("Invalid attempt!");
                }

                await userService.DeleteUserRefreshTokens(user.UserName!, refreshToken);

                return Ok(new { Message = "Logout successful." });
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}