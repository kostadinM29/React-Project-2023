using api_server.Constants;

namespace api_server.Extensions
{
    public static class PathExtensions
    {
        public static string ToFullImagePath(this string relativePath)
        {
            string fullPath = Path.Combine(DomainConstants.Domain, relativePath.TrimStart('/'));

            return fullPath;
        }
    }
}