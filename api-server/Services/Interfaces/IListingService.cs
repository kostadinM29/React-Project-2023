using api_server.Data.Models;
using api_server.RequestModels;

namespace api_server.Services.Interfaces
{
    public interface IListingService
    {
        Task<IEnumerable<Listing>> GetListings(string userId);
        Task<Listing> Create(ListingRequestModel listingRequest, string userId);
    }
}