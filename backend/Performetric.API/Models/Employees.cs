using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Performetric.API.Models
{
    [Table("employees")]
    public class Employees : BaseModel
    {
        [PrimaryKey("id", false)]
        [Column("id")] 
        public Guid EmployeeId { get; set; }

        [Column("user_id")]
        public int? UserId { get; set; }

        [Column("full_name")]
        public string FullName { get; set; } = string.Empty;

    }
}
