using api_server.Data;
using api_server.Data.Models;
using api_server.Dtos;
using api_server.Extensions;
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
        private readonly IWebHostEnvironment _hostingEnvironment;

        public ListingService(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
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
                string imagePath = await SaveImageAsync(imageData);

                Image image = new()
                {
                    Path = imagePath,
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

        private async Task<string> SaveImageAsync(string imageData)
        {
            string[] imageDataParts = imageData.Split(',');

            if (imageDataParts.Length != 2)
            {
                return string.Empty;
            }

            string base64String = imageDataParts[1];

            string fileExtension = FileExtensions.GetImageFileExtension(imageDataParts[0]);
            string fileName = $"{Guid.NewGuid()}.{fileExtension}";

            string wwwrootPath = _hostingEnvironment.WebRootPath;

            string imagePath = Path.Combine(wwwrootPath, "images", fileName);

            byte[] imageBytes = Convert.FromBase64String(base64String);
            await File.WriteAllBytesAsync(imagePath, imageBytes);

            return Path.Combine("images", fileName);
        }
    }
}