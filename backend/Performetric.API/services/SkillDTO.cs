using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class SkillDTO
{
    [JsonPropertyName("id")]
    public Guid SkillId { get; set; }
    [JsonPropertyName("skill_name")]
    public string SkillName { get; set; } = string.Empty;
    [JsonPropertyName("skill_description")]
    public string SkillDescription { get; set; }
    [JsonPropertyName("category")]
    public int? CategoryId { get; set; }
    public string? CategoryName { get; set; }

}
