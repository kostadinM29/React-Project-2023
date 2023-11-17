using System.Security.Claims;

using api_server.Data.Models;
using api_server.Models;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Identity;

namespace api_server.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IJWTService jwtService;
        private readonly IUserService userService;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IJWTService jwtService, IUserService userService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.jwtService = jwtService;
            this.userService = userService;
        }
        public async Task<(int, UserTokens?, string)> Register(RegisterRequestModel model, string role)
        {
            ApplicationUser? userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists is not null)
            {
                return (0, null, "User already exists");
            }

            ApplicationUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };

            IdentityResult createUserResult = await userManager.CreateAsync(user, model.Password);
            if (!createUserResult.Succeeded)
            {
                return (0, null, string.Join(", ", createUserResult.Errors.Select(error => error.Description)));
            }

            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }

            if (await roleManager.RoleExistsAsync(role))
            {
                await userManager.AddToRoleAsync(user, role);
            }

            ClaimsIdentity? claimsIdentity = await userService.GetClaimsPrincipalFromUser(user);
            UserTokens? token = jwtService.GenerateToken(claimsIdentity);

            return (1, token, "User created successfully!");
        }

        public async Task<(int, UserTokens?, string)> Login(LoginRequestModel model)
        {
            ApplicationUser? user = await userManager.FindByNameAsync(model.Username);
            if (user is null)
            {
                return (0, null, "Invalid username");
            }

            if (!await userManager.CheckPasswordAsync(user, model.Password))
            {
                return (0, null, "Invalid password");
            }

            ClaimsIdentity? claimsIdentity = await userService.GetClaimsPrincipalFromUser(user);
            UserTokens? token = jwtService.GenerateToken(claimsIdentity);

            return (1, token, "Login successful.");
        }
    }
}