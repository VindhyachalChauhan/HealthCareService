using HealthCareService.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace HealthCareService.Repositories.Interface
{
    public interface ITokenRepository
    {
        //string CreateJwtToken(IdentityUser user, List<string> roles);
        string CreateJwtToken(ApplicationUser user);
    }
}