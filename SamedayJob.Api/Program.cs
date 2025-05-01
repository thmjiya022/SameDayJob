using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using SamedayJob.Api.Data;
using SamedayJob.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add minimal OpenAPI support
builder.Services.AddOpenApi();

// Add controllers support
builder.Services.AddControllers();

// Add EF Core with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=samedayjob.db"));

// Add password hasher service
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use OpenAPI in development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Enable CORS before routing
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
