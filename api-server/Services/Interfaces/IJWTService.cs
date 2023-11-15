using System.Security.Claims;

using api_server.Data.Models;
using api_server.Models;

namespace api_server.Services.Interfaces
{
    public interface IJWTService
    {
        UserTokens? GenerateToken(ClaimsIdentity claimsIdentity);
        UserTokens? GenerateRefreshToken(ClaimsIdentity claimsIdentity);
        Task<ApplicationUser?> GetUserFromExpiredToken(string token);
    }
}