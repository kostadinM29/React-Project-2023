using System.Text.Json.Serialization;

namespace api_server.Dtos
{
    public class ListingDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("userId")]
        public string UserId { get; set; }

        [JsonPropertyName("userName")]
        public string UserName { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("created")]
        public string Created { get; set; }

        [JsonPropertyName("views")]
        public int ViewCount { get; set; }

        [JsonPropertyName("images")]
        public List<string> ImageUrls { get; set; }

        [JsonPropertyName("tags")]
        public List<string> Tags { get; set; }

        [JsonPropertyName("details")]
        public string? ContactDetails { get; set; }
    }
}