using api_server.Dtos;
using api_server.RequestModels;

namespace api_server.Services.Interfaces
{
    public interface IListingService
    {
        Task<int?> UpdateViewsForListing(int listingId);
        Task<ListingDTO?> GetListingById(int listingId);
        Task<ListingDTO?> GetListingById(int listingId, string userId);
        Task<IEnumerable<ListingDTO>> GetListings();
        Task<IEnumerable<ListingDTO>?> GetListingsByUser(string userId);
        Task<ListingDTO?> Create(ListingRequestModel listingRequest, string userId);
        Task<ListingDTO?> Edit(ListingRequestModel listingRequest, string userId);
        Task<(int, string)> Delete(int listingId, string userId);
    }
}