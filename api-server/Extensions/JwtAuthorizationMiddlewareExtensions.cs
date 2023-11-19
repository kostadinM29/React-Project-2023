using api_server.Middlewares;

namespace api_server.Extensions
{
    public static class JwtAuthorizationMiddlewareExtensions
    {
        public static IApplicationBuilder UseJwtAuthorization(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtAuthorizationMiddleware>();
        }
    }
}