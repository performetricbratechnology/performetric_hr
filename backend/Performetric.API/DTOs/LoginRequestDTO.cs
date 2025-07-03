using System.Text.Json.Serialization;

namespace Performetric.API.DTOs;

public class LoginRequestDTO
{
    [JsonPropertyName("mail_id")]
    public string MailId { get; set; }

    [JsonPropertyName("password_id")]
    public string PasswordId { get; set; }
    
}


