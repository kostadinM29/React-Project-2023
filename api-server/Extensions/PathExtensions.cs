namespace api_server.Extensions
{
    public static class PathExtensions
    {
        public static string ToFullImagePath(this string relativePath)
        {
            string apiPath = "https://localhost:5001";

            string fullPath = Path.Combine(apiPath, relativePath.TrimStart('/'));

            return fullPath;
        }
    }
}