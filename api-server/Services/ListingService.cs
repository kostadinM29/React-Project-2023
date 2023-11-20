using api_server.Data;
using api_server.Data.Models;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace api_server.Services
{
    public class ListingService : IListingService
    {
        private readonly ApplicationDbContext _context;

        public ListingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Listing>> GetListings()
        {
            return await _context.Listings.ToListAsync();
        }

        public async Task<IEnumerable<Listing>> GetListingsByUser(string userId)
        {
            return await _context.Listings
                .Where(listing => listing.UserId == userId)
                .ToListAsync();
        }

        public async Task<Listing?> Create(ListingRequestModel listingRequest, string userId)
        {
            List<Image> images = new();

            foreach (byte[] imageData in listingRequest.Images)
            {
                Image image = new()
                {
                    Data = imageData,
                };

                images.Add(image);
            }

            Listing? listing = new()
            {
                UserId = userId,
                Title = listingRequest.Title,
                Description = listingRequest.Description,
                Images = images,
                ContactDetails = listingRequest.ContactDetails,
            };

            await _context.Listings.AddAsync(listing);

            int status = await _context.SaveChangesAsync();

            return status > 0 
                ? listing 
                : null;
        }
    }
}