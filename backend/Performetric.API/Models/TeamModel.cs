using Microsoft.AspNetCore.Mvc;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using Supabase;


namespace Performetric.API.Models
{
    [Table("teams")]
    public class Team : BaseModel
    {
        [PrimaryKey("id", false)]
        [Column("id")]
        public Guid TeamId { get; set; }

        [Column("team_name")]
        public string TeamName { get; set; }

        [Column("description")]
        public string Description { get; set; }
    }
}
