using api_server.Data;
using api_server.Data.Models;
using api_server.Dtos;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using AutoMapper;

using Microsoft.EntityFrameworkCore;

namespace api_server.Services
{
    public class ListingService : IListingService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ListingService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ListingDTO>> GetListings()
        {
            List<Listing>? listings = await _context.Listings
                .Include(l => l.User)
                .Include(l => l.Images)
                .Include(l => l.Tags)
                .ToListAsync();

            return listings.Select(l => _mapper.Map<ListingDTO>(l)).ToList();
        }

        public async Task<IEnumerable<ListingDTO>> GetListingsByUser(string userId)
        {
            List<Listing>? listings = await _context.Listings
                .Where(listing => listing.UserId == userId)
                .Include(l => l.User)
                .Include(l => l.Images)
                .Include(l => l.Tags)
                .ToListAsync();

            return listings.Select(l => _mapper.Map<ListingDTO>(l)).ToList();
        }

        public async Task<ListingDTO?> Create(ListingRequestModel listingRequest, string userId)
        {
            List<Image> images = new();
            foreach (string imageData in listingRequest.Images)
            {
                Image image = new()
                {
                    Data = imageData,
                };

                images.Add(image);
            }

            List<Tag> tags = new();
            foreach (string title in listingRequest.Tags)
            {
                Tag tag = new()
                {
                    Title = title,
                };

                tags.Add(tag);
            }

            Listing listing = new()
            {
                UserId = userId,
                Title = listingRequest.Title,
                Description = listingRequest.Description,
                Tags = tags,
                Images = images,
                ContactDetails = listingRequest.ContactDetails,
            };

            await _context.Listings.AddAsync(listing);

            int status = await _context.SaveChangesAsync();

            if (status > 0)
            {
                ListingDTO listingDTO = _mapper.Map<ListingDTO>(listing);
                return listingDTO;
            }

            return null;
        }
    }
}