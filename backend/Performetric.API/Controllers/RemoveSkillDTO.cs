using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class RemoveSkillDTO
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

}