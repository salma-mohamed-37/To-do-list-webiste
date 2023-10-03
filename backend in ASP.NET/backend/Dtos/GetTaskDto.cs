namespace backend.Dtos
{
    public class GetTaskDto
    {
        public int Id { set; get; }
        public string Content { set; get; }
        public DateTime? DueDate { set; get; }
        public bool IsCompleted { set; get; }
    }
}
