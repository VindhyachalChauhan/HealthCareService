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

        public async Task<Appointment?> DeleteAsync(Guid id)
        {
            var existingAppointment = await dbContext.Appointments.FirstOrDefaultAsync(a => a.bookingId==id);
            if (existingAppointment is null)
            {
                return null;
            }
            dbContext.Appointments.Remove(existingAppointment);
            await dbContext.SaveChangesAsync();
            return existingAppointment;
        }

        public async Task<IEnumerable<Appointment>> GetAllAsync()
        {
            return await dbContext.Appointments.ToListAsync();
        }

        public async Task<Appointment?> GetByIdAsync(Guid id)
        {
            return await dbContext.Appointments.FirstOrDefaultAsync(a=>a.bookingId==id);   
        }

        public async Task<IEnumerable<Appointment>> GetByPatientIdAsync(Guid id)
        {
            return await dbContext.Appointments.Where(a => a.patientId == id).ToListAsync();
        }
            public Task<Appointment> UpdateAsync(Appointment appointment)
        {
            throw new NotImplementedException();
        }

      
    }
}
