using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class SkillCategoriesDTO
{
    [JsonPropertyName("id")]
    public int CategoryId { get; set; }
    [JsonPropertyName("category_name")]
    public string CategoryName { get; set; }
    [JsonPropertyName("category_description")]
    public string CategoryDescription { get; set; }

}
