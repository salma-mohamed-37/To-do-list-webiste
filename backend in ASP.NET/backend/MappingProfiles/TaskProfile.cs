using AutoMapper;
using backend.Dtos;

namespace backend.MappingProfiles
{
    public class TaskProfile : Profile
    {
        public TaskProfile() 
        {
            CreateMap<AddTaskDto, Models.Task>().ForMember(des => des.IsCompleted, opt => opt.MapFrom(src => false));
            CreateMap<Models.Task, GetTaskDto>();
        }
    }
}
