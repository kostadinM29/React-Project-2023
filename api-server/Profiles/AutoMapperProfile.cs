using api_server.Data.Models;
using api_server.Dtos;

using AutoMapper;

namespace api_server.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Listing, ListingDTO>()
            .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom(src => src.Images.Select(image => image.Data)))
            .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags.Select(tag => tag.Title)))
            .ConstructUsing((src, context) => new ListingDTO(
                src.Id,
                src.UserId,
                src.User.UserName,
                src.Title,
                src.Description,
                src.Images.Select(image => image.Data).ToList(),
                src.ContactDetails
            ));
        }

        private string? ConvertToBase64(byte[] data)
        {
            return data is not null
                ? Convert.ToBase64String(data)
                : null;
        }
    }
}