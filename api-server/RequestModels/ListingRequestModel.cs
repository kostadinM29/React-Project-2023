using System.ComponentModel.DataAnnotations;

namespace api_server.RequestModels
{
    public class ListingRequestModel
    {
        [Required(ErrorMessage = "Title is required!")]
        [MaxLength(30)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required!")]
        [MaxLength(200)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Contact Details is required!")]
        public string ContactDetails { get; set; }

        public List<string> Tags { get; set; } = new List<string>();

        public List<string> Images { get; set; } = new List<string>();
    }
}