using System.Security.Claims;

using api_server.Data.Models;

namespace api_server.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserRefreshTokens> AddUserRefreshTokens(UserRefreshTokens userTokens);
        Task<UserRefreshTokens?> GetSavedRefreshTokens(string username, string refreshtoken);
        Task DeleteUserRefreshTokens(string username, string refreshToken);
        Task<ClaimsIdentity> GetClaimsPrincipalFromUser(ApplicationUser user);
    }
}