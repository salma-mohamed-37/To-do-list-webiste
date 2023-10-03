using backend.Dtos;
using FluentValidation;

namespace backend.DtosValidation
{
    public class AddTaskDtoValidation : AbstractValidator<AddTaskDto>
    {
       public AddTaskDtoValidation() 
        {
            RuleFor(x=>x.Content).NotEmpty();
        }  
    }
}
