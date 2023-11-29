using HeyRed.Mime;

namespace api_server.Extensions
{
    public static class FileExtensions
    {
        public static string GetImageFileExtension(string imageData)
        {
            string[] parts = imageData.Split(';');
            if (parts.Length > 0)
            {
                string[] formatPart = parts[0].Split('/');
                if (formatPart.Length > 1)
                {
                    string mimeType = $"image/{formatPart[1]}";
                    string fileExtension = MimeTypesMap.GetExtension(mimeType);

                    if (!string.IsNullOrEmpty(fileExtension))
                    {
                        return fileExtension.TrimStart('.');
                    }
                }
            }

            // Default to a specific extension if the format is not recognized for some reason.
            return "png";
        }
    }
}