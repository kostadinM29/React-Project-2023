using System.ComponentModel.DataAnnotations;

namespace api_server.RequestModels
{
    public class ListingRequestModel
    {
        [Required(ErrorMessage = "Title is required!")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required!")]
        public string Description { get; set; }

        public string? ContactDetails { get; set; }

        public List<string> Images { get; set; } = new List<string>();
    }
}