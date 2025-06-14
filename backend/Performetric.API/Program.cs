using Performetric.API.Services;
using BCrypt;
using Dapper;
using Supabase;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddScoped<AuthService>();  // REGISTRE O SERVIÇO AQUI
builder.Services.AddScoped<RegistrationService>();
builder.Services.AddScoped<RegistrationTeamService>();
builder.Services.AddScoped<RegistrationSkillService>();
builder.Services.AddScoped<EvaluationService>();



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

app.UseCors("AllowReact");

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var hash = BCrypt.Net.BCrypt.HashPassword("123456");
Console.WriteLine(hash);

app.Run();
