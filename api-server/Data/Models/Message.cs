namespace api_server.Data.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }

        // New property for storing the group key
        public string GroupKey { get; set; }
    }
}
