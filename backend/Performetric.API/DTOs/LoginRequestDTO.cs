using System.Text.Json.Serialization;

namespace Performetric.API.DTOs;

public class LoginRequestDTO
{
    [JsonPropertyName("mailId")]
    public string MailId { get; set; }

    [JsonPropertyName("passwordId")]
    public string PasswordId { get; set; }
    
}


