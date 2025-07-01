using Microsoft.Extensions.Configuration;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;
using Performetric.API.Controllers;
using Performetric.API.Models;
using Supabase;
using Supabase.Postgrest.Models;
using System.Linq;
using System;
namespace Performetric.API.Services
{

    public class RegistrationSkillService : IRegisterService
    {

        private readonly Supabase.Client _supabaseClient;

        public RegistrationSkillService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }



        public async Task<List<SkillDTO>> GetAllSkills()
{
            // Busca todas as categorias
            var categoriesResponse = await _supabaseClient
                .From<SkillCategory>()
                .Get();

            var categories = categoriesResponse.Models.ToDictionary(c => c.CategoryId, c => c.CategoryName);

            // Busca todas as skills
            var skillsResponse = await _supabaseClient
                .From<Skill>()
                .Get();

            return skillsResponse.Models.Select(s => new SkillDTO
            {
                SkillId = s.SkillId,
                SkillName = s.SkillName,
                SkillDescription = s.SkillDescription,
                CategoryId = s.CategoryId,
                CategoryName = s.CategoryId != null && categories.ContainsKey(s.CategoryId.Value)
                    ? categories[s.CategoryId.Value]
                    : "Sem Categoria"
            }).ToList();
        }


        public async Task<bool> RegisterSkill(SkillDTO skill)
        {

            var existing = await _supabaseClient
                .From<Skill>()
                .Where(x => x.SkillName == skill.SkillName)
                .Get();



            if (existing.Model != null)
            {
                return false;
            }


            var newSkill = new Skill
            {
                SkillId = Guid.NewGuid(),
                SkillName = skill.SkillName,
                SkillDescription = skill.SkillDescription,
                CategoryId = skill.CategoryId
            };


            var response = await _supabaseClient
                .From<Skill>()
                .Insert(newSkill);

            return response.Models != null && response.Models.Any();

        }

    }
}