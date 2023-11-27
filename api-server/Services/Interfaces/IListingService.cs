using api_server.Data.Models;
using api_server.Dtos;
using api_server.RequestModels;

namespace api_server.Services.Interfaces
{
    public interface IListingService
    {
        Task<IEnumerable<ListingDTO>> GetListings();
        Task<IEnumerable<ListingDTO>> GetListingsByUser(string userId);
        Task<ListingDTO?> Create(ListingRequestModel listingRequest, string userId);
    }
}