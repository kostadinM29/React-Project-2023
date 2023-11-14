using api_server.Data;
using api_server.Data.Models;

namespace api_server.Services.Interfaces
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext db;

        public UserService( ApplicationDbContext db)
        {
            this.db = db;
        }

        public UserRefreshTokens AddUserRefreshTokens(UserRefreshTokens user)
        {
            db.UserRefreshToken.Add(user);
            db.SaveChanges();
            return user;
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
    }
}