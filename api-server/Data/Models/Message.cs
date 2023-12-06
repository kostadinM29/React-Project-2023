using System.ComponentModel.DataAnnotations.Schema;

namespace api_server.Data.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Content { get; set; }
        public int ListingId { get; set; }
        [ForeignKey(nameof(ListingId))]
        public virtual Listing Listing { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string GroupKey { get; set; }
    }
}