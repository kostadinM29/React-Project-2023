using api_server.Data;
using api_server.Data.Models;
using api_server.Dtos;
using api_server.Services.Interfaces;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api_server.Hubs
{
    public class ChatHub(ApplicationDbContext _dbContext, IListingService _listingService, IMapper _mapper) : Hub
    {
        public async Task SendMessage(string groupKey, int listingId, string sender, string receiver, string message)
        {
            if (sender == receiver)
            {
                return;
            }

            Listing? listing = await _listingService.GetListingItemById(listingId);

            if (listing is null)
            {
                return;
            }

            Message newMessage = new()
            {
                Sender = sender,
                Receiver = receiver,
                Content = message,
                Listing = listing,
                GroupKey = groupKey
            };

            await _dbContext.Messages.AddAsync(newMessage);
            await _dbContext.SaveChangesAsync();

            MessageDTO? messageDto = _mapper.Map<MessageDTO>(newMessage);

            await Clients
                .Group(groupKey)
                .SendAsync("ReceiveMessage", messageDto);
        }

        public async Task JoinChat(string groupKey, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupKey);

            await Clients.OthersInGroup(groupKey).SendAsync("UserJoined", userName);
        }

        public async Task<List<MessageDTO>> GetChatHistory(string groupKey)
        {
            List<Message>? messages = await _dbContext.Messages
                .Where(m => m.GroupKey == groupKey)
                .OrderBy(m => m.Timestamp)
                .Take(50)
                .ToListAsync();

            return messages
                .Select(l => _mapper.Map<MessageDTO>(l))
                .ToList();
        }
    }
}