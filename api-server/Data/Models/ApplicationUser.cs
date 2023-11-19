using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api_server.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime RegisteredOn { get; set; } = DateTime.UtcNow;
        public ICollection<Listing> Listings { get; set; }
    }
}