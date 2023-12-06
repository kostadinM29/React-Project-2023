using api_server.Dtos;

namespace api_server.Services.Interfaces
{
    public interface IChatService
    {
        Task<List<ChatDTO>?> GetChats(string currentUserName);
    }
}