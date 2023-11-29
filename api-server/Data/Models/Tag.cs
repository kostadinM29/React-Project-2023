using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api_server.Data.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Listing))]
        public int ListingId { get; set; }

        public virtual Listing Listing { get; set; }

        public string Title { get; set; }
    }
}