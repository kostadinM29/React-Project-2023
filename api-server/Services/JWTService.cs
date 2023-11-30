using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

using api_server.Data.Models;
using api_server.Models;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace api_server.Services
{
    public class JWTService(IConfiguration configuration, UserManager<ApplicationUser> userManager) : IJWTService
    {
        public UserTokens? GenerateToken(ClaimsIdentity claimsIdentity)
        {
            return GenerateJWTTokens(claimsIdentity);
        }

        public UserTokens? GenerateRefreshToken(ClaimsIdentity claimsIdentity)
        {
            return GenerateJWTTokens(claimsIdentity);
        }

        public UserTokens? GenerateJWTTokens(ClaimsIdentity claimsIdentity)
        {
#pragma warning disable CS0168 // Variable is declared but never used
            try
            {
                JwtSecurityTokenHandler? tokenHandler = new();
                byte[]? tokenKey = Encoding.UTF8.GetBytes(configuration["JWTKey:Secret"]!);
                long _TokenExpiryTimeInHour = Convert.ToInt64(configuration["JWTKey:TokenExpiryTimeInHour"]);

                SecurityTokenDescriptor? tokenDescriptor = new()
                {
                    Issuer = configuration["JWTKey:ValidIssuer"],
                    Audience = configuration["JWTKey:ValidAudience"],
                    Subject = claimsIdentity,
                    Expires = DateTime.UtcNow.AddHours(_TokenExpiryTimeInHour),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                                                                SecurityAlgorithms.HmacSha256Signature)
                };

                SecurityToken? token = tokenHandler.CreateToken(tokenDescriptor);
                string? refreshToken = GenerateRefreshToken();

                return new UserTokens { AccessToken = tokenHandler.WriteToken(token), RefreshToken = refreshToken };
            }
            catch (Exception ex)
            {
                return null;
            }
#pragma warning restore CS0168 // Variable is declared but never used
        }

        public string GenerateRefreshToken()
        {
            byte[]? randomNumber = new byte[32];
            using RandomNumberGenerator? rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);

            return Convert.ToBase64String(randomNumber);
        }

        public async Task<ApplicationUser?> GetUserFromToken(string token, bool validateLifetime = false)
        {
            byte[]? key = Encoding.UTF8.GetBytes(configuration["JWTKey:Secret"]!);

            TokenValidationParameters? tokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = validateLifetime,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero,
                ValidIssuer = configuration["JWTKey:ValidIssuer"],
                ValidAudience = configuration["JWTKey:ValidAudience"]
            };

            JwtSecurityTokenHandler? tokenHandler = new();
            ClaimsPrincipal? principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken
                || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            string? username = principal.Identity?.Name;

            ApplicationUser? user = await userManager.FindByNameAsync(username!);

            return user;
        }
    }
}