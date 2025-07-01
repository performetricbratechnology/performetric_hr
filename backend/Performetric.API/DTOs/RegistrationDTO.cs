using Performetric.API.Interfaces;
using System.Text.Json.Serialization;

namespace Performetric.API.DTOs;

public class RegistrationDTO
{

    [JsonPropertyName("fullName")]
    public string FullName { get; set; }
    public string Position {get; set; }
    public string Email { get; set; }
    public string Team { get; set; }
    
}
