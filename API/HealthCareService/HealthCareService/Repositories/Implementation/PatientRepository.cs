using HealthCareService.Data;
using HealthCareService.Models.Domain;
using HealthCareService.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace HealthCareService.Repositories.Implementation
{
    public class PatientRepository : IPatientRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PatientRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Patient> CreateAsync(Patient patient)
        {
            await dbContext.Patients.AddAsync(patient);
            await dbContext.SaveChangesAsync();

            return patient;

        }

        public async Task<IEnumerable<Patient>> GetAllAsync()
        {
            return await dbContext.Patients.ToListAsync();
        }
    }
}
