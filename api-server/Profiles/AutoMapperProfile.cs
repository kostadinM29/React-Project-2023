using api_server.Data.Models;
using api_server.Dtos;
using api_server.Extensions;

using AutoMapper;

namespace api_server.Profiles
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Listing, ListingDTO>()
            .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom(src => src.Images.Select(image => image.Path.ToFullImagePath())))
            .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags.Select(tag => tag.Title)))
            .ConstructUsing((src, context) => new ListingDTO(
                src.Id,
                src.UserId,
                src.User.UserName,
                src.Title,
                src.Description,
                src.Images.Select(image => image.Path.ToFullImagePath()).ToList(),
                src.ContactDetails
            ));
        }
    }
}