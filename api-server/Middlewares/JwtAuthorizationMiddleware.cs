using api_server.Data.Models;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Identity;

using System.Security.Claims;

namespace api_server.Middlewares
{
    public class JwtAuthorizationMiddleware(RequestDelegate next)
    {
        public async Task Invoke(HttpContext context)
        {
            UserManager<ApplicationUser>? userManager = context.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            IJWTService? jwtService = context.RequestServices.GetRequiredService<IJWTService>();
            IUserService userService = context.RequestServices.GetRequiredService<IUserService>();

            string? accessToken = context.Request.Cookies["accessToken"];

            if (!string.IsNullOrEmpty(accessToken))
            {
                ApplicationUser? user = await jwtService.GetUserFromToken(accessToken);

                if (user is not null)
                {
                    ClaimsIdentity claimsIdentity = await userService.GetClaimsPrincipalFromUser(user);

                    context.User = new ClaimsPrincipal(claimsIdentity);
                }
            }

            await next(context);
        }
    }
}