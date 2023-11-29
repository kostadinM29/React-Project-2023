using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_server.Data.Models
{
    public class Listing
    {
        public Listing()
        {
            Images = new List<Image>();
        }

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

        public virtual ICollection<Tag> Tags { get; set; }

        public virtual ICollection<Image> Images { get; set; }

        public string? ContactDetails { get; set; }
    }
}