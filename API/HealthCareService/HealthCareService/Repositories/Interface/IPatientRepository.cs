using HealthCareService.Models.Domain;

namespace HealthCareService.Repositories.Interface
{
    public interface IPatientRepository
    {
        Task<Patient> CreateAsync(Patient patient);
    }
}
