using System;

namespace Performetric.API.Models
{

    public class EvaluationUser
    {
        public string UserName { get; set; } = string.Empty;
        public List<EvaluationSkill> Skills { get; set; } = new();
        

        public double CalculateFinalEvaluationRequest(List<EvaluationSkill> skills, List<Evaluation> evaluations)
        {
            if (skills == null || skills.Count == 0)
            return 0.0;

            return Math.Round(EvaluationSkill.CalculateFinalScore(skills, evaluations), 2);
        }

    }
}