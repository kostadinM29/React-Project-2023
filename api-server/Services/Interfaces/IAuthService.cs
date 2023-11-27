using api_server.Models;
using api_server.RequestModels;

namespace api_server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<(int, UserTokens?, string)> Register(RegisterRequestModel model, string role);

        Task<(int, UserTokens?, string)> Login(LoginRequestModel model);
    }
}