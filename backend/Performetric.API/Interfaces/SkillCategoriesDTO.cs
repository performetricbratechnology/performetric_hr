using System.Text.Json.Serialization;
using Performetric.API.DTOs;
using Performetric.API.Interfaces;

namespace Performetric.API.Interfaces;


    public class SkillCategoriesDTO
    {
        [JsonPropertyName("id")]
        public int CategoryId { get; set; }
        [JsonPropertyName("category_name")]
        public string CategoryName { get; set; }
        [JsonPropertyName("category_description")]
        public string CategoryDescription { get; set; }

    }
