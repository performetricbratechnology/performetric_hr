using Microsoft.Extensions.Configuration;
using Performetric.API.Controllers;
using Performetric.API.Services.Interfaces;
using Performetric.API.Models;
using Supabase;
using Supabase.Postgrest.Models;
using System.Linq;
using System;
namespace Performetric.API.Services
{

    public class SkillCategoryService : ISkillCategoryService
    {

        private readonly Supabase.Client _supabaseClient;

        public SkillCategoryService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }


        public async Task<List<SkillCategoriesDTO>> GetAllCategories()
        {
            var categoriesResponse = await _supabaseClient
                .From<SkillCategory>()
                .Get();

            return categoriesResponse.Models.Select(c => new SkillCategoriesDTO
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName,
                CategoryDescription = c.CategoryDescription
            }).ToList();
        }



    }
}