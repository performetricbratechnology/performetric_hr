using Performetric.API.Models;
using Performetric.API.Controllers;
using Supabase.Postgrest.Models;
using System.Linq;
using System;

namespace Performetric.API.Services;

public class EvaluationService
{
    private readonly Supabase.Client _supabaseClient;

    public EvaluationService(Supabase.Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task AddSelfEvaluationAsync(EvaluationDTO dto)
    {
        if (dto.EvaluatorId != dto.EvaluateeId)
            throw new ArgumentException("Autoavaliação precisa do mesmo avaliador e avaliado.");

        dto.EvaluationType = "self";
        await AddEvaluationInternalAsync(dto);
    }

    public async Task AddPeerEvaluationAsync(EvaluationDTO dto)
    {
        if (dto.EvaluatorId == dto.EvaluateeId)
            throw new ArgumentException("Avaliação de pares precisa ser entre usuários diferentes.");

        dto.EvaluationType = "peer";
        await AddEvaluationInternalAsync(dto);
    }

    public async Task AddManagerEvaluationAsync(EvaluationDTO dto)
    {
        
        Console.WriteLine($"[DEBUG] Procurando employee com id: {dto.EvaluatorId}");

        // Busca o employee pelo EvaluatorId (GUID)
        var employeeResponse = await _supabaseClient
        .From<Employees>()
        .Where(e => e.EmployeeId == dto.EvaluatorId)
        .Get();

        Console.WriteLine($"[DEBUG] Encontrados: {employeeResponse.Models.Count}");

        if (employeeResponse.Models == null || !employeeResponse.Models.Any())
            throw new ArgumentException("Avaliador não encontrado.");

        var employee = employeeResponse.Models.First();

        // Busca o user_credentials pelo UserId (int) do employee
        var userResponse = await _supabaseClient
            .From<User>()
            .Where(e => e.UserId == employee.UserId)
            .Get();

        if (userResponse.Models == null || !userResponse.Models.Any())
            throw new ArgumentException("Usuário vinculado ao avaliador não encontrado.");

        var user = userResponse.Models.First();

        if (!user.IsStaff)
            throw new ArgumentException("Avaliador não é um gerente.");

        dto.EvaluationType = "manager";
        await AddEvaluationInternalAsync(dto);
    }


    private async Task AddEvaluationInternalAsync(EvaluationDTO dto)
    {
        // Cria a avaliação (sem SkillId e Score, só dados gerais)
        var evaluation = new Evaluation
        {
            EvaluatorId = dto.EvaluatorId,
            EvaluateeId = dto.EvaluateeId,
            EvaluationType = dto.EvaluationType,
            CreatedAt = DateTime.UtcNow,
            Comment = dto.Comment
        };

        // Insere avaliação e recupera o ID gerado
        var insertResponse = await _supabaseClient
            .From<Evaluation>()
            .Insert(evaluation);

        var insertedEvaluation = insertResponse.Models.FirstOrDefault();
        if (insertedEvaluation == null)
            throw new Exception("Falha ao inserir avaliação.");

        // Cria avaliação da skill associada
        var evaluationSkill = new EvaluationSkill
        {
            EvaluationId = insertedEvaluation.Id,
            SkillId = dto.SkillId,
            Score = dto.Score
        };

        await _supabaseClient
            .From<EvaluationSkill>()
            .Insert(evaluationSkill);
    }
}
