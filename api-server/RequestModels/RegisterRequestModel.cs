using System.ComponentModel.DataAnnotations;

namespace api_server.RequestModels
{
    public class RegisterRequestModel
    {
        [Required(ErrorMessage = "Username is required!")]
        public string Username { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        [EmailAddress(ErrorMessage ="Please enter a valid email!")]
        [Required(ErrorMessage = "Email is required!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; }
    }
}
