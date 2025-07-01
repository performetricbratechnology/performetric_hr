using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Performetric.API.Models
{
    [Table("skill_categories")]
    public class SkillCategory : BaseModel
    {
        [PrimaryKey("id", false)]
        [Column("id")]
        public int CategoryId { get; set; }

        [Column("category_name")]
        public string CategoryName { get; set; }
        [Column("category_description")]
        public string CategoryDescription { get; set; }
    }
}
