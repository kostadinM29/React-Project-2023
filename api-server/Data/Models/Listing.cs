using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_server.Data.Models
{
    public class Listing
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }

        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        [Required]
        [MaxLength(200)]
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public int ViewsCount { get; set; }

        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();

        public virtual ICollection<Image> Images { get; set; } = new List<Image>();

        public string? ContactDetails { get; set; }
    }
}