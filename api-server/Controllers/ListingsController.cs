﻿using System.Text.Json;

using api_server.Attributes;
using api_server.Data.Models;
using api_server.Dtos;
using api_server.RequestModels;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api_server.Controllers
{
    [Route("api/listings")]
    [ApiController]
    [SimulateSlowResponse(1000)] // 1000 milliseconds (1 seconds) delay.
    public class ListingController(IListingService listingService, ILogger<ListingController> logger, UserManager<ApplicationUser> userManager) : ControllerBase
    {
        [HttpGet]
        [Route("update-views")]
        public async Task<IActionResult> UpdateViewsForListing(int id)
        {
            try
            {
                int? viewCount = await listingService.UpdateViewsForListing(id);

                if (!viewCount.HasValue)
                {
                    return NotFound("Listing not found!");
                }

                return Ok(viewCount);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("one")]
        public async Task<IActionResult> GetListing(int id)
        {
            try
            {
                ListingDTO? listing = await listingService.GetListingById(id);

                if (listing is null)
                {
                    return NotFound("Listing not found!");
                }

                return Ok(listing);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("one-by-user")]
        public async Task<IActionResult> GetListingByUser(int id)
        {
            try
            {
                string? userId = userManager.GetUserId(User);

                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User not found!");
                }

                ListingDTO? listing = await listingService.GetListingById(id, userId);

                if (listing is null)
                {
                    return NotFound("Listing not found by the user!");
                }

                return Ok(listing);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("latest")]
        public async Task<IActionResult> GetListings(int count)
        {
            try
            {
                IEnumerable<ListingDTO>? listings = await listingService.GetLatestListings(count);

                string jsonString = JsonSerializer.Serialize(listings);

                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [AllowAnonymous]
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
        [HttpGet]
        [Route("all-by-user")]
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
                    return BadRequest("No listings found for the user!");
                }

                return Ok(listings);
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
        public async Task<IActionResult> Create(ListingRequestModel listingRequest)
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

                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened and the listing wasn't saved!");
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> Edit(ListingRequestModel listingRequest)
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

                ListingDTO? listingDTO = await listingService.Edit(listingRequest, userId);

                if (listingDTO is not null)
                {
                    return Ok(listingDTO);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, "Something happened and the listing wasn't saved!");
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            try
            {
                string? userId = userManager.GetUserId(User);

                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("User not found!");
                }

                (int result, string message) = await listingService.Delete(id, userId);

                if (result > 0)
                {
                    return Ok(new { id, message });
                }

                return StatusCode(StatusCodes.Status500InternalServerError, message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}