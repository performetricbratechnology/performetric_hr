using System.Text.Json.Serialization;

namespace Performetric.API.DTOs;

public class AddSkillDTO
{

    [JsonPropertyName("employee_id")]
    public Guid EmployeeId { get; set; }
    [JsonPropertyName("skill_id")]
    public Guid SkillId { get; set; }

}
