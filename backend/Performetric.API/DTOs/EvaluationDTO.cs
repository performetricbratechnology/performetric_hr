using System;

namespace Performetric.API.DTOs
{
  public class EvaluationDTO
{
    public Guid Id { get; set; }
    public Guid EvaluatorId { get; set; }
    public Guid EvaluateeId { get; set; }
    public Guid SkillId { get; set; }
    public int Score { get; set; }
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; }
    public string EvaluationType { get; set; } // "self", "peer", "manager"
}

}