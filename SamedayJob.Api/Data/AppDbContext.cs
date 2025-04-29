using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Models;

namespace SamedayJob.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
    public DbSet<User> Users {get; set;}
}