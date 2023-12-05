using api_server.Data;
using api_server.Data.Models;

using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api_server.Hubs
{
    public class ChatHub(ApplicationDbContext _dbContext) : Hub
    {
        public async Task SendMessage(string groupKey, string sender, string receiver, string message)
        {
            // Prevent users from sending messages to themselves
            if (sender == receiver)
            {
                return; // Do nothing
            }

            Message newMessage = new()
            {
                Sender = sender,
                Receiver = receiver,
                Content = message,
                Timestamp = DateTime.Now,
                GroupKey = groupKey
            };

            _dbContext.Messages.Add(newMessage);
            await _dbContext.SaveChangesAsync();

            await Clients.Group(groupKey).SendAsync("ReceiveMessage", sender, message);
        }

        public async Task JoinChat(string groupKey)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupKey);
        }

        public async Task<List<Message>> GetChatHistory(string groupKey)
        {
            return await _dbContext.Messages
                .Where(m => m.GroupKey == groupKey)
                .OrderBy(m => m.Timestamp)
                .Take(50)
                .ToListAsync();
        }
    }
}