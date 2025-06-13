using System;

namespace Performetric.API.Models
{
    public class EvaluationSkill
    {

        public string SkillName { get; set; } = string.Empty;

        public double IndividualEvaluation { get; set; }
        public double PairEvaluation { get; set; }
        public double ManagerToUserEvaluation { get; set; }

        public double Evaluation360 { get; set; }

        public double CalculateFinalEvaluationRequest()
        {

            return Math.Round(
                (IndividualEvaluation * 0.15) +
                (PairEvaluation * 0.25) +
                (ManagerToUserEvaluation * 0.35) +
                (Evaluation360 * 0.25),
                2
            );


        }

    }

}