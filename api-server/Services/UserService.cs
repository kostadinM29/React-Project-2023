using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using api_server.Data;
using api_server.Data.Models;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api_server.Services.Interfaces
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext db;
        private readonly UserManager<ApplicationUser> userManager;

        public UserService(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
        {
            this.db = db;
            this.userManager = userManager;
        }

        public async Task<UserRefreshTokens> AddUserRefreshTokens(UserRefreshTokens userTokens)
        {
            await db.UserRefreshToken.AddAsync(userTokens);
            await db.SaveChangesAsync();
            return userTokens;
        }

        public async Task DeleteUserRefreshTokens(string username, string refreshToken)
        {
            UserRefreshTokens? item = await db.UserRefreshToken
                .FirstOrDefaultAsync(x => x.UserName == username && x.RefreshToken == refreshToken);

            if (item is not null)
            {
                db.UserRefreshToken.Remove(item);
                await db.SaveChangesAsync();
            }
        }

        public async Task<UserRefreshTokens?> GetSavedRefreshTokens(string username, string refreshToken)
        {
            return await db.UserRefreshToken
                .FirstOrDefaultAsync(x => x.UserName == username && x.RefreshToken == refreshToken && x.IsActive == true);
        }

        public async Task<ClaimsIdentity> GetClaimsPrincipalFromUser(ApplicationUser user)
        {
            IList<string> userRoles = await userManager.GetRolesAsync(user);

#pragma warning disable CS8604 // Possible null reference argument.
            List<Claim> authClaims = new()
            {
               new Claim(ClaimTypes.Name, user.UserName),
               new Claim(ClaimTypes.NameIdentifier, user.Id),
               new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
#pragma warning restore CS8604 // Possible null reference argument.

            foreach (string userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            return new (authClaims);
        }
    }
}