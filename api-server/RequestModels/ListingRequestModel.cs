using System.ComponentModel.DataAnnotations;

namespace api_server.RequestModels
{
    public class ListingRequestModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required!")]
        [MaxLength(30)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required!")]
        [MaxLength(200)]
        public string Description { get; set; }

        public string? Details { get; set; }

        public List<string> Tags { get; set; } = [];

        public List<string> Images { get; set; } = [];
    }
}