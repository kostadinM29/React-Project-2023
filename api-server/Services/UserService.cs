using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using api_server.Data;
using api_server.Data.Models;

using Microsoft.AspNetCore.Identity;

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

        public UserRefreshTokens AddUserRefreshTokens(UserRefreshTokens userTokens)
        {
            db.UserRefreshToken.Add(userTokens);
            db.SaveChanges();
            return userTokens;
        }

        public void DeleteUserRefreshTokens(string username, string refreshToken)
        {
            UserRefreshTokens? item = db.UserRefreshToken.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken);
            if (item is not null)
            {
                db.UserRefreshToken.Remove(item);
            }
        }

        public UserRefreshTokens? GetSavedRefreshTokens(string username, string refreshToken)
        {
            return db.UserRefreshToken
                .FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken && x.IsActive == true);
        }

        public async Task<ClaimsIdentity> GetClaimsPrincipalFromUser(ApplicationUser user)
        {
            IList<string> userRoles = await userManager.GetRolesAsync(user);

            List<Claim> authClaims = new()
            {
               new Claim(ClaimTypes.Name, user.UserName),
               new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (string userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            return new (authClaims);
        }
    }
}