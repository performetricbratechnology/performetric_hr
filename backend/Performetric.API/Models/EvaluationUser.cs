using System;

namespace Performetric.API.Models
{
    public string UserName { get; set; } = string.Empty;
    public List<EvaluationSkill> Skills { get; set; } = new();

    public double CalculateFinalEvaluationRequest()
    {
        if (Skills.Count == 0)
        {
            return 0.0;
        }

        return Math.Round(Skills.Select
        (c => c.CalculateFinalEvaluationRequest()).Average(), 2);
    }
}