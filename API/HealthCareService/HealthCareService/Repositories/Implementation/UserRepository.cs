using HealthCareService.Data;
using HealthCareService.Models.Domain;
using HealthCareService.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace HealthCareService.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<ApplicationUser> GetAsync(Guid id)
        {
            return await dbContext.User.FirstOrDefaultAsync(u=>u.Id==id);
        }

        public async Task<ApplicationUser> RegisterAsync(ApplicationUser user)
        {
            await dbContext.User.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        public Task<ApplicationUser> UpdateAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }
    }
}
