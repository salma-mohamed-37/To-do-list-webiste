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

            switch (Filter)
            {
                case "All":
                    var allTasks = await context.Tasks.AsNoTracking().ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).OrderByDescending(x => x.IsCompleted).ThenBy(x => x.DueDate).ToListAsync();
                    return Ok(allTasks);

                case "Today":
                    DateTime today = DateTime.Now;
                    var todayTasks = await context.Tasks.AsNoTracking().Where(x => x.DueDate.HasValue && x.DueDate.Value.Date == today.Date).OrderBy(x => x.IsCompleted).ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).ToListAsync();
                    return Ok(todayTasks);

                case "Completed":
                    var completedTasks = await context.Tasks.AsNoTracking().Where(x => x.IsCompleted == true).OrderBy(x => x.DueDate).ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).ToListAsync();
                    return Ok(completedTasks);

                case "Upcomming":
                    DateTime today2 = DateTime.Now;
                    var upcommingTasks = await context.Tasks.AsNoTracking().Where(x => x.DueDate.HasValue && x.DueDate.Value.Date > today2.Date).OrderBy(x => x.DueDate).ToListAsync();
                    return Ok(upcommingTasks);
            }
            var tasks = await context.Tasks.AsNoTracking().OrderBy(x => x.IsCompleted).OrderBy(x => x.DueDate).ProjectTo<GetTaskDto>(mapper.ConfigurationProvider).ToListAsync();
            return Ok(tasks);
        }
        
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await context.Tasks.Where(x => x.Id == id).FirstOrDefaultAsync();
            if(task is null)
            {
                return NotFound();
            }
            var dto = mapper.Map<GetTaskDto>(task);
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(AddTaskDto dto)
        {
            var validationResult = await validator.ValidateAsync(dto);
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            Models.Task task = mapper.Map<Models.Task>(dto);

            context.Tasks.Add(task);

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("{id}/{completed}")]
        public async Task<IActionResult> Check(int id,bool completed)
        {
            var task = await context.Tasks.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (task == null) 
            {
                return NotFound();
            }
            task.IsCompleted= completed;

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AddTaskDto dto)
        {
            var task = await context.Tasks.Where(x=>x.Id == id).FirstOrDefaultAsync();
            if(task is null)
            {
                return NotFound();
            }
            task.Content = dto.Content;
            task.DueDate = dto.DueDate;

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await context.Tasks.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (task is null)
            {
                return NotFound();
            }
            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
