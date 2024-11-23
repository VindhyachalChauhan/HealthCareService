using HealthCareService.Data;
using HealthCareService.Models.Domain;
using HealthCareService.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace HealthCareService.Repositories.Implementation
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext dbContext;

        public AppointmentRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Appointment> CreateAsync(Appointment appointment)
        {
            await dbContext.Appointments.AddAsync(appointment);
            await dbContext.SaveChangesAsync();
            return appointment;
        }

     

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Appointment>> GetAllAsync()
        {
            return await dbContext.Appointments.ToListAsync();
        }

        public Task<Appointment?> GetByIdAsync(Guid id)
        {
            return dbContext.Appointments.FirstOrDefaultAsync(a=>a.bookingId==id);   
        }

        public Task<Appointment?> GetByPatientIdAsync(Guid id)
        {
            return dbContext.Appointments.FirstOrDefaultAsync(a=>a.patientId==id);
        }

        public Task<Appointment> UpdateAsync(Appointment appointment)
        {
            throw new NotImplementedException();
        }
    }
}
