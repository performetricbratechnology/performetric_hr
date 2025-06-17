using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System;

namespace Performetric.API.Models
{
    [Table("evaluations")]
    public class Evaluation : BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; }

        [Column("evaluatorid")]
        public Guid EvaluatorId { get; set; }

        [Column("evaluateeid")]
        public Guid EvaluateeId { get; set; }

        [Column("evaluationtype")]
        public string? EvaluationType { get; set; }

        [Column("evaluationdate")]
        public DateTime CreatedAt { get; set; }

        [Column("comments")]
        public string? Comment { get; set; }


        public static double CalculateFinalEvaluationRequest(
        List<EvaluationSkill> evaluationSkills,
        List<Evaluation> evaluations)
        
        {
            if (evaluationSkills == null || evaluations == null)
                return 0;

            // Junta as skills com o tipo da avaliação
            var skillsWithType = from skill in evaluationSkills
                                 join eval in evaluations
                                 on skill.EvaluationId equals eval.Id
                                 select new
                                 {
                                     Score = Math.Clamp(skill.Score, 0, 5),
                                     EvaluationType = eval.EvaluationType?.ToLower() ?? ""
                                 };

            // Calcula média por tipo
            double selfAverage = skillsWithType
                .Where(s => s.EvaluationType == "self")
                .Select(s => s.Score)
                .DefaultIfEmpty(0)
                .Average();

            double peerAverage = skillsWithType
                .Where(s => s.EvaluationType == "peer")
                .Select(s => s.Score)
                .DefaultIfEmpty(0)
                .Average();

            double managerAverage = skillsWithType
                .Where(s => s.EvaluationType == "manager")
                .Select(s => s.Score)
                .DefaultIfEmpty(0)
                .Average();

            // Pesos fixos
            const double selfWeight = 0.25;
            const double peerWeight = 0.30;
            const double managerWeight = 0.45;

            // Média ponderada final
            double finalScore = (selfAverage * selfWeight) + (peerAverage * peerWeight) + (managerAverage * managerWeight);

            // Arredonda para 2 casas decimais
            return Math.Round(finalScore, 2);
        }

    }
}


