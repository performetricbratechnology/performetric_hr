using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class EmployeeDTO
{

    public Guid Id { get; set; }


    [JsonPropertyName("full_name")]
    public string FullName { get; set; }
    [JsonPropertyName("position")]
    public string Position { get; set; } = string.Empty;
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;
    [JsonPropertyName("team")]
    public string Team { get; set; } = string.Empty;

}
