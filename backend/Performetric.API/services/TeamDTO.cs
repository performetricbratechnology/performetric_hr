using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class TeamDTO
{
    public Guid Id { get; set; }

    [JsonPropertyName("team_name")]
    public string TeamName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
   
}
