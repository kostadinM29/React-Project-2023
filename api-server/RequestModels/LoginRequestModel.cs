using System.ComponentModel.DataAnnotations;

namespace api_server.RequestModels
{
    public class LoginRequestModel
    {
        [Required(ErrorMessage = "Username is required!")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Password is required!")]
        public string? Password { get; set; }
    }
}
