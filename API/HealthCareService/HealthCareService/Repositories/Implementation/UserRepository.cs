using HealthCareService.Data;
using HealthCareService.Models.Domain;
using HealthCareService.Models.DTO;
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
        public async Task<ApplicationUser?> GetAsync(Guid id)
        {
            return await dbContext.User.FirstOrDefaultAsync(u=>u.Id==id);
        }

        public async Task<ApplicationUser> RegisterAsync(ApplicationUser user)
        {
            await dbContext.User.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<ApplicationUser?> SignInAsync(LoginRequestDto user)
        {
            //return  (ApplicationUser)dbContext.User.Where(u => u.user_email == user.Email && u.password == user.Password);
            return await dbContext.User.FirstOrDefaultAsync(u => u.user_email == user.Email && u.password == user.Password);

        }

        public async Task<ApplicationUser?> UpdateAsync(ApplicationUser user)
        {
            var existingUser = await dbContext.User.FirstOrDefaultAsync(u=>u.Id == user.Id);   

            if (existingUser is null)
            {
                return null;
            }
            //for password
            user.password = existingUser.password;
            dbContext.Entry(existingUser).CurrentValues.SetValues(user);

            await dbContext.SaveChangesAsync();
            return user;
        }
    }
}
