using System.Text.Json.Serialization;

namespace Performetric.API.Services;

public class EmployeeDTO
{
   
    public Guid Id { get; set; }


    [JsonPropertyName("full_name")]
    public string FullName { get; set; }
    public string Position { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Team { get; set; } = string.Empty;
}
