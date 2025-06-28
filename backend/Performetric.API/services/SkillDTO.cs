using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class SkillDTO
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    [JsonPropertyName("skill_name")]
    public string SkillName { get; set; } = string.Empty;
    [JsonPropertyName("skill_description")]
    public string SkillDescription { get; set; }
    [JsonPropertyName("category")]
    public Guid SkillCategory { get; set; }

}
