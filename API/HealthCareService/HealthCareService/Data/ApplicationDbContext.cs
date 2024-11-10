using HealthCareService.Models;
using HealthCareService.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace HealthCareService.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ApplicationUser> User { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

    }
}
