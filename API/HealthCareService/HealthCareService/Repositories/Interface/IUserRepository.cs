using HealthCareService.Models.Domain;
using HealthCareService.Models.DTO;

namespace HealthCareService.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<ApplicationUser> RegisterAsync(ApplicationUser user);
        Task<ApplicationUser> SignInAsync(LoginRequestDto user);
        Task<ApplicationUser> UpdateAsync(ApplicationUser user);
        Task<ApplicationUser> GetAsync(Guid id);
    }
}
