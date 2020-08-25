using Application.CodingTestApplication;
using AutoMapper;
using Domain.CodingTest;

namespace Infrastructure.Config.MapperConfig
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration()
        {
            CreateConfiguration();
        }

        public void CreateConfiguration()
        {
        }
    }
}
