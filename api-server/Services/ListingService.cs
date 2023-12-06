using api_server.Constants;
using api_server.Controllers;
using api_server.Data;
using api_server.Data.Models;
using api_server.Dtos;
using api_server.Extensions;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using AutoMapper;

using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api_server.Services
{
    public class ListingService(ApplicationDbContext context, IMapper mapper, ILogger<ListingController> logger, IWebHostEnvironment hostingEnvironment) : IListingService
    {
        public async Task<int?> UpdateViewsForListing(int listingId)
        {
            Listing? listing = await GetListing(listingId);

            if (listing is null)
            {
                return null;
            }

            listing.ViewsCount++;

            context.Listings.Update(listing);
            await context.SaveChangesAsync();

            return listing.ViewsCount;
        }

        public async Task<IEnumerable<ListingDTO>> GetListings()
        {
            List<Listing>? listings = await context.Listings
                .Include(l => l.User)
                .Include(l => l.Images)
                .Include(l => l.Tags)
                .ToListAsync();

            return listings.Select(l => mapper.Map<ListingDTO>(l)).ToList();
        }

        public async Task<Listing?> GetListingItemById(int listingId)
        {
            Listing? listing = await GetListing(listingId);

            if (listing is null)
            {
                return null;
            }

            return listing;
        }

        public async Task<ListingDTO?> GetListingById(int listingId)
        {
            Listing? listing = await GetListing(listingId);

            if (listing is null)
            {
                return null;
            }

            return mapper.Map<ListingDTO>(listing);
        }

        public async Task<ListingDTO?> GetListingById(int listingId, string userId)
        {
            Listing? listing = await GetListingByUser(listingId, userId);

            if (listing is null)
            {
                return null;
            }

            return mapper.Map<ListingDTO>(listing);
        }

        public async Task<IEnumerable<ListingDTO>?> GetListingsByUser(string userId)
        {
            List<Listing>? listings = await context.Listings
                .Where(listing => listing.UserId == userId)
                .Include(l => l.User)
                .Include(l => l.Images)
                .Include(l => l.Tags)
                .ToListAsync();

            if (listings is null)
            {
                return null;
            }

            return listings.Select(l => mapper.Map<ListingDTO>(l)).ToList();
        }

        public async Task<ListingDTO?> Create(ListingRequestModel listingRequest, string userId)
        {
            List<Image> images = [];

            foreach (string imageData in listingRequest.Images)
            {
                string imagePath = await SaveImageAsync(imageData);

                Image image = new()
                {
                    Path = imagePath,
                };

                images.Add(image);
            }

            List<Tag> tags = [];
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

            await context.Listings.AddAsync(listing);

            int status = await context.SaveChangesAsync();

            if (status > 0)
            {
                ListingDTO listingDTO = mapper.Map<ListingDTO>(listing);
                return listingDTO;
            }

            return null;
        }

        public async Task<ListingDTO?> Edit(ListingRequestModel listingRequest, string userId)
        {
            Listing? listing = await GetListingByUser(listingRequest.Id, userId);

            if (listing is null)
            {
                return null;
            }

            List<Image> images = [];

            foreach (string imageData in listingRequest.Images)
            {
                if (!imageData.StartsWith(DomainConstants.Domain))
                {
                    string imagePath = await SaveImageAsync(imageData);

                    Image image = new()
                    {
                        Path = imagePath,
                    };

                    images.Add(image);
                }
                else
                {
                    Image? alreadyExistingImage = await context.Images.FirstOrDefaultAsync(i => imageData.EndsWith(i.Path));

                    if (alreadyExistingImage is not null)
                    {
                        images.Add(alreadyExistingImage);
                    }
                }
            }

            List<Tag> tags = [];
            foreach (string title in listingRequest.Tags)
            {
                if (!listing.Tags.IsNullOrEmpty()
                    && listing.Tags.Any(t => t.Title == title))
                {
                    Tag? alreadyExistingTag = await context.Tags.FirstOrDefaultAsync(t => t.Title == title && t.ListingId == listing.Id);

                    if (alreadyExistingTag is not null)
                    {
                        tags.Add(alreadyExistingTag);
                    }
                }
                else
                {
                    Tag tag = new()
                    {
                        Title = title,
                    };

                    tags.Add(tag);
                }
            }

            listing.UserId = userId;
            listing.Title = listingRequest.Title;
            listing.Description = listingRequest.Description;
            listing.Tags = tags;
            listing.Images = images;
            listing.ContactDetails = listingRequest.ContactDetails;

            context.Listings.Update(listing);

            int status = await context.SaveChangesAsync();

            if (status > 0)
            {
                ListingDTO listingDTO = mapper.Map<ListingDTO>(listing);
                return listingDTO;
            }

            return null;
        }

        public async Task<(int, string)> Delete(int listingId, string userId)
        {
            try
            {
                Listing? listing = await GetListingByUser(listingId, userId);

                if (listing is null)
                {
                    return (-1, "Listing not found for the user!");
                }

                context.RemoveRange(listing.Tags);
                context.RemoveRange(listing.Images);
                context.Remove(listing);

                int result  = await context.SaveChangesAsync();
                return (result, "Listing deleted!");
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return (-1, "Something happened and the listing wasn't deleted!");
            }
        }

        private async Task<Listing?> GetListing(int listingId)
        {
            return await context.Listings
                .Include(l => l.User)
                .Include(l => l.Images)
                .Include(l => l.Tags)
                .FirstOrDefaultAsync(l => l.Id == listingId);
        }

        private async Task<Listing?> GetListingByUser(int listingId, string userId)
        {
            return await context.Listings
                .Include(l => l.User)
                .Include(l => l.Images)
                .Include(l => l.Tags)
                .FirstOrDefaultAsync(l => l.Id == listingId && l.UserId == userId);
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

            string wwwrootPath = hostingEnvironment.WebRootPath;

            string imagePath = Path.Combine(wwwrootPath, "images", fileName);

            byte[] imageBytes = Convert.FromBase64String(base64String);
            await File.WriteAllBytesAsync(imagePath, imageBytes);

            return Path.Combine("images", fileName);
        }
    }
}