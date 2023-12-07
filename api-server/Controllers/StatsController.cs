using api_server.Data;
using api_server.Dtos;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_server.Controllers
{
    [AllowAnonymous]
    [Route("api/stats")]
    [ApiController]
    public class StatsController(ApplicationDbContext context, ILogger<StatsController> logger) : ControllerBase
    {
        [HttpGet]
        [Route("get-stats")]
        public async Task<IActionResult> GetStats()
        {
            try
            {
                StatsDTO? stats = new()
                {
                    UsersCount = await context.Users.CountAsync(),
                    ListingsCount = await context.Listings.CountAsync(),
                    MessagesCount  = await context.Messages.CountAsync(),
                    ListingsViewsCount = await context.Listings.SumAsync(l => l.ViewsCount)
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}