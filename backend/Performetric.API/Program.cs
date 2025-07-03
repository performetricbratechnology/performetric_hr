using Performetric.API.Services;
using Performetric.API.Interfaces;
using Performetric.API.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BCrypt;
using Dapper;
using Supabase;

var builder = WebApplication.CreateBuilder(args);

var key = Encoding.ASCII.GetBytes(Configuration.PrivateKey);


builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false; 
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<Supabase.Client>(_ => new Supabase.Client(
    builder.Configuration["SupabaseUrl"],
    builder.Configuration["SupabaseKey"],
    new SupabaseOptions
    {
        AutoRefreshToken = true,
        AutoConnectRealtime = true
    }
));

builder.Services.AddTransient<TokenService>();

builder.Services.AddScoped<RegistrationService>();
builder.Services.AddScoped<RegistrationTeamService>();
builder.Services.AddScoped<IRegisterService, RegistrationSkillService>();
builder.Services.AddScoped<EvaluationService>();
builder.Services.AddScoped<RemoveUserService>(); // 
builder.Services.AddScoped<IUserEdit, EditUserService>(); // 
builder.Services.AddScoped<ITeamEdit, EditTeamService>();
builder.Services.AddScoped<ISkillEdit, EditSkillService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISkillCategoryService, SkillCategoryService>();



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("AllowReact");

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.Run();
