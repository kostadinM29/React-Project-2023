using System.Text.Json.Serialization;

namespace api_server.Dtos
{
    public class ListingDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("images")]
        public List<string> ImageUrls { get; set; }

        public string ContactDetails { get; set; }

        public ListingDTO(int id, string userId, string userName, string title, string description, List<string> imageUrls, string contactDetails)
        {
            Id = id;
            UserId = userId;
            UserName = userName;
            Title = title;
            Description = description;
            ImageUrls = imageUrls;
            ContactDetails = contactDetails;
        }
    }
}