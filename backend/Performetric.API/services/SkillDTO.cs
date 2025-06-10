using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class SkillDTO
{
    public Guid Id { get; set; }

    [JsonPropertyName("skill_name")]
    public string SkillName { get; set; } = string.Empty;
   
}
