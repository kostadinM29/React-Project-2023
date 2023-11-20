using api_server.Data.Models;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api_server.Controllers
{
    namespace api_server.Controllers
    {
        [Authorize]
        [Route("api/listings")]
        [ApiController]
        public class ListingController : ControllerBase
        {
            private readonly IListingService listingService;
            private readonly ILogger<ListingController> logger;
            private readonly UserManager<ApplicationUser> userManager;

            public ListingController(IListingService listingService, ILogger<ListingController> logger, UserManager<ApplicationUser> userManager)
            {
                this.listingService = listingService;
                this.logger = logger;
                this.userManager = userManager;
            }

            [HttpGet]
            [Route("all-for-user")]
            public async Task<IActionResult> GetListingsByUser()
            {
                try
                {
                    string? userId = userManager.GetUserId(User);

                    if (string.IsNullOrEmpty(userId))
                    {
                        return BadRequest("User not found!");
                    }

                    IEnumerable<Listing>? listings = await listingService.GetListingsByUser(userId);

                    if (listings.IsNullOrEmpty())
                    {
                        return NotFound("No listings found for the user!");
                    }

                    return Ok(listings);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex.Message);
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            [HttpGet]
            [Route("all")]
            public async Task<IActionResult> GetListings()
            {
                try
                {
                    IEnumerable<Listing>? listings = await listingService.GetListings();

                    return Ok(listings);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex.Message);
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            [HttpPost]
            [Route("create")]
            public async Task<IActionResult> CreateListing(ListingRequestModel listingRequest)
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest("Invalid payload!");
                    }

                    string? userId = userManager.GetUserId(User);

                    if (string.IsNullOrEmpty(userId))
                    {
                        return BadRequest("User not found!");
                    }

                    Listing? listing = await listingService.Create(listingRequest, userId);
                    if (listing is null)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, "Something happened and listing wasn't created!");
                    }

                    return Ok(listing.Id);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex.Message);
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }
        }
    }
}