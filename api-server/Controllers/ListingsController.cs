using System.Text.Json.Serialization;
using System.Text.Json;

using api_server.Data.Models;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text.Encodings.Web;
using api_server.Dtos;

namespace api_server.Controllers
{
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

        [Authorize]
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

                IEnumerable<ListingDTO>? listings = await listingService.GetListingsByUser(userId);

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
                IEnumerable<ListingDTO>? listings = await listingService.GetListings();

                string jsonString = JsonSerializer.Serialize(listings);

                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
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

                ListingDTO? listingDTO = await listingService.Create(listingRequest, userId);

                if (listingDTO is not null)
                {
                    return Ok(listingDTO);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened and listing wasn't created!");
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}