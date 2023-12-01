using Microsoft.AspNetCore.Mvc.Filters;

namespace api_server.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class SimulateSlowResponseAttribute(int delayMilliseconds) : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            await Task.Delay(delayMilliseconds);

            await next();
        }
    }
}