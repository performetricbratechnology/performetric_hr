using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Performetric.API.Models
{
    [Table("evaluationskills")]
    public class EvaluationSkill : BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; }

        [Column("evaluationid")]
        public Guid EvaluationId { get; set; }

        [Column("skillid")]
        public Guid SkillId { get; set; }

        [Column("score")]
        public int Score { get; set; }

        public static double CalculateFinalEvaluationRequest(List<EvaluationSkill> evaluationSkills)
        {
            if (evaluationSkills == null || !evaluationSkills.Any())
                return 0;

            return evaluationSkills.Average(es => es.Score);
        }

        public static double CalculateFinalScore(
    List<EvaluationSkill> evaluationSkills, 
    List<Evaluation> evaluations)
{
    if (evaluationSkills == null || evaluations == null)
        return 0;

    var skillsWithType = from skill in evaluationSkills
                         join eval in evaluations
                         on skill.EvaluationId equals eval.Id
                         select new EvaluationSkillWithType
                         {
                             Score = skill.Score,
                             EvaluationType = eval.EvaluationType
                         };

    double totalWeight = 0;
    double weightedSum = 0;

    foreach (var item in skillsWithType)
    {
        int weight = item.EvaluationType switch
        {
            "self" => 1,
            "peer" => 2,
            "manager" => 3,
            _ => 1
        };

        weightedSum += item.Score * weight;
        totalWeight += weight;
    }

    if (totalWeight == 0)
        return 0;

    return weightedSum / totalWeight;
}

    }

    public class EvaluationSkillWithType
    {
        public int Score { get; set; }
        public string EvaluationType { get; set; }
    }
}
