using api_server.Data.Models;
using api_server.Dtos;
using api_server.Services.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api_server.Controllers
{
    [Authorize]
    [Route("api/chats")]
    [ApiController]
    public class ChatController(UserManager<ApplicationUser> userManager, ILogger<ListingController> logger, IChatService chatService) : ControllerBase
    {
        [HttpGet]
        [Route("get-chats-by-user")]
        public async Task<IActionResult> GetListingsByUser()
        {
            try
            {
                string? userName = userManager.GetUserName(User);

                if (string.IsNullOrEmpty(userName))
                {
                    return BadRequest("User doesn't have an username!");
                }

                List<ChatDTO>? chats =  await chatService.GetChats(userName);

                return Ok(chats);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}