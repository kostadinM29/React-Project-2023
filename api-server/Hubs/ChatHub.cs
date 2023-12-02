using api_server.Data;
using api_server.Data.Models;

using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api_server.Hubs
{
    public class ChatHub(ApplicationDbContext _dbContext) : Hub
    {
        public async Task SendMessage(string sender, string receiver, string message)
        {
            Message? newMessage = new() { Sender = sender, Receiver = receiver, Content = message };

            _dbContext.Messages.Add(newMessage);
            await _dbContext.SaveChangesAsync();

            await Clients.Group(receiver).SendAsync("ReceiveMessage", sender, message);
        }

        public async Task RequestChatHistory(string user)
        {
            List<Message>? chatHistory = await _dbContext.Messages
                .Where(m => m.Sender == user || m.Receiver == user)
                .OrderByDescending(m => m.Timestamp)
                .Take(50)
                .ToListAsync();

            await Clients.Caller.SendAsync("ReceiveChatHistory", chatHistory);
        }

        public async Task JoinChat(string user, string otherUser)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user);
            await Groups.AddToGroupAsync(Context.ConnectionId, otherUser);
        }
    }
}