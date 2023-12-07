using api_server.Data;
using api_server.Data.Models;
using api_server.Dtos;
using api_server.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace api_server.Services
{
    public class ChatService(ApplicationDbContext context) : IChatService
    {
        public async Task<List<ChatDTO>?> GetChats(string currentUserName)
        {
            List<Message>? chats = await context.Messages
                .Where(message => message.Sender == currentUserName || message.Receiver == currentUserName)
                .ToListAsync();

            if (chats is null)
            {
                return null;
            }

            return chats
                .DistinctBy(message => message.GroupKey)
                .Select(message => new ChatDTO()
                {
                    ListingId = message.ListingId,
                    OtherUserName = message.Sender.Equals(currentUserName) 
                        ? message.Receiver
                        : message.Sender
                })
                .ToList();
        }
    }
}