using HealthCareService.Models.Domain;

namespace HealthCareService.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<ApplicationUser> RegisterAsync(ApplicationUser user);
        Task<ApplicationUser> UpdateAsync(ApplicationUser user);
        Task<ApplicationUser> GetAsync(Guid id);
    }
}
