using Microsoft.EntityFrameworkCore;
using SamedayJob.Api.Models;

namespace SamedayJob.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Job> Jobs { get; set; }
    public DbSet<JobCategory> JobCategories { get; set; }
    public DbSet<JobRequest> JobRequests { get; set; }
    public DbSet<JobAssignment> JobAssignments { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Equipment> Equipments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // USER
        modelBuilder.Entity<User>(userEntity =>
        {
            userEntity.Property(user => user.Email)
                .IsRequired()
                .HasMaxLength(100);

            userEntity.Property(user => user.Password)
                .HasColumnType("nvarchar(200)");

            userEntity.Property(user => user.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");
        });

        // JOB
        modelBuilder.Entity<Job>()
            .HasOne(job => job.Client)
            .WithMany(user => user.PostedJobs)
            .HasForeignKey(job => job.PostedBy)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Job>()
            .HasOne(job => job.Category)
            .WithMany(jobCategory => jobCategory.Jobs)
            .HasForeignKey(job => job.CategoryID);

        // JOB REQUEST
        modelBuilder.Entity<JobRequest>()
            .HasOne(jobRequest => jobRequest.Job)
            .WithMany(job => job.JobRequests)
            .HasForeignKey(jobRequest => jobRequest.JobID);

        modelBuilder.Entity<JobRequest>()
            .HasOne(jobRequest => jobRequest.Worker)
            .WithMany(user => user.JobRequests)
            .HasForeignKey(jobRequest => jobRequest.WorkerID);

        // JOB ASSIGNMENT
        modelBuilder.Entity<JobAssignment>()
            .HasOne(jobAssignment => jobAssignment.Job)
            .WithOne(job => job.Assignment)
            .HasForeignKey<JobAssignment>(jobAssignment => jobAssignment.JobId);

        modelBuilder.Entity<JobAssignment>()
            .HasOne(jobAssignment => jobAssignment.Worker)
            .WithMany()
            .HasForeignKey(jobAssignment => jobAssignment.WorkerId);

        //JOB CATEGORY
        modelBuilder.Entity<JobCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryID);
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);
        });

        // REVIEW
        modelBuilder.Entity<Review>()
            .HasOne(review => review.FromUser)
            .WithMany(user => user.GivenReviews)
            .HasForeignKey(review => review.FromUserID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Review>()
            .HasOne(review => review.ToUser)
            .WithMany(user => user.ReceivedReviews)
            .HasForeignKey(review => review.ToUserID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Review>()
            .HasOne(review => review.Job)
            .WithMany(job => job.Reviews)
            .HasForeignKey(review => review.JobID);

        // MESSAGE
        modelBuilder.Entity<Message>()
            .HasOne(message => message.Sender)
            .WithMany(user => user.SentMessages)
            .HasForeignKey(message => message.SenderID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(message => message.Receiver)
            .WithMany(user => user.ReceivedMessages)
            .HasForeignKey(message => message.ReceiverID)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(message => message.Job)
            .WithMany(job => job.Messages)
            .HasForeignKey(message => message.JobID);

        // EQUIPMENT
        modelBuilder.Entity<Equipment>()
            .HasOne(equipment => equipment.Owner)
            .WithMany(user => user.Tools)
            .HasForeignKey(equipment => equipment.OwnerID);
    }
}