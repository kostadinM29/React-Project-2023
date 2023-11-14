using api_server.Data.Models;

namespace api_server.Services.Interfaces
{
    public interface IUserService
    {
        UserRefreshTokens AddUserRefreshTokens(UserRefreshTokens user);

        UserRefreshTokens? GetSavedRefreshTokens(string username, string refreshtoken);

        void DeleteUserRefreshTokens(string username, string refreshToken);
    }
}