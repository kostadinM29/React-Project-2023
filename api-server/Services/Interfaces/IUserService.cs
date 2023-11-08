﻿using api_server.RequestModels;

namespace api_server.Services.Interfaces
{
    public interface IUserService
    {
        Task<(int, string)> Register(RegisterRequestModel model, string role);

        Task<(int, string)> Login(LoginRequestModel model);
    }
}
