using System.Text.Json.Serialization;

namespace Performetric.API.DTOs;

public class RemoveSkillDTO
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

}