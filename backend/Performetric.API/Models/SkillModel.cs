using Microsoft.AspNetCore.Mvc;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Supabase;


namespace Performetric.API.Models
{
    [Table("skills")]
    public class Skill : BaseModel
    {
        [PrimaryKey("id", false)]
        [Column("id")]
        public Guid SkillId { get; set; }

        [Column("skill_name")]
        public string SkillName { get; set; }

    
    }
}
