using System.IdentityModel.Tokens.Jwt;
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
        private readonly IConfiguration configuration;
        private readonly IJWTService jwtService;

        public AuthService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IJWTService jwtService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            this.jwtService = jwtService;
        }
        public async Task<(int, string)> Register(RegisterRequestModel model, string role)
        {
            ApplicationUser? userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists is not null)
            {
                return (0, "User already exists");
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
                return (0, "User creation failed! Please check user details and try again.");
            }

            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }

            if (await roleManager.RoleExistsAsync(role))
            {
                await userManager.AddToRoleAsync(user, role);
            }

            return (1, "User created successfully!");
        }

        public async Task<(int, UserTokens?, string)> Login(LoginRequestModel model)
        {
            ApplicationUser? user = await userManager.FindByNameAsync(model.Username);
            if (user is null)
            {
                return (0, null,"Invalid username");
            }

            if (!await userManager.CheckPasswordAsync(user, model.Password))
            {
                return (0, null,"Invalid password");
            }

            IList<string> userRoles = await userManager.GetRolesAsync(user);
            List<Claim> authClaims = new()
            {
               new Claim(ClaimTypes.Name, user.UserName),
               new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            ClaimsIdentity claimsIdentity = new(authClaims);
            UserTokens? token = jwtService.GenerateToken(claimsIdentity);

            return (1, token, "Login successful.");
        }
    }
}
