using AutoMapper;
using AutoMapper.QueryableExtensions;
using backend.Data;
using backend.Dtos;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IValidator<AddTaskDto> validator;
        public TasksController(ApplicationDbContext context, IMapper mapper, IValidator<AddTaskDto> validator) 
        { 
            this.context = context;
            this.mapper = mapper;   
            this.validator = validator;
        }
        [HttpGet("{filter}")]
        public async Task<IActionResult> GetTasks(String Filter) 
        {
            
            switch(Filter)
            {
                case "All":
                    var allTasks = await context.Tasks.AsNoTracking().ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).OrderBy(x => x.IsCompleted).OrderBy(x=>x.DueDate).ToListAsync();
                    return Ok(allTasks);

                case "Today":
                    DateTime today = DateTime.Now;
                    var todayTasks = await context.Tasks.AsNoTracking().Where(x => x.DueDate == today).OrderBy(x => x.IsCompleted).ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).ToListAsync();
                    return Ok(todayTasks);

                case "Completed":
                    var completedTasks = await context.Tasks.AsNoTracking().Where(x => x.IsCompleted == true).OrderBy(x => x.DueDate).ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).ToListAsync();
                    return Ok(completedTasks);

                case "Upcomming":
                    DateTime today2 = DateTime.Now;
                    var upcommingTasks = await context.Tasks.AsNoTracking().Where(x => x.DueDate > today2).OrderBy(x => x.DueDate).ToListAsync();
                    return Ok(upcommingTasks);
            }
            var tasks = await context.Tasks.AsNoTracking().OrderBy(x => x.IsCompleted).OrderBy(x => x.DueDate).ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).ToListAsync();
            return Ok(tasks);
        }
    }
}
