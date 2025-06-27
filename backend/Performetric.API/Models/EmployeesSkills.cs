using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Performetric.API.Models
{
    [Table("employee_skills")]
    public class EmployeesSkills : BaseModel
    {
        [PrimaryKey("id", false)]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("employee_id")]
        public Guid EmployeeId { get; set; }


        [Column("skill_id")]
        public Guid SkillId { get; set; }

    }
}
