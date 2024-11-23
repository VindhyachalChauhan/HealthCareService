using HealthCareService.Models.Domain;

namespace HealthCareService.Repositories.Interface
{
    public interface IAppointmentRepository
    {
        Task<Appointment> CreateAsync(Appointment appointment);
        Task<Appointment> UpdateAsync(Appointment appointment);
        Task DeleteAsync(Guid id);
        Task<Appointment?> GetByIdAsync(Guid id);
        Task<Appointment?> GetByPatientIdAsync(Guid id);
        Task<IEnumerable<Appointment>> GetAllAsync();
    }
}
