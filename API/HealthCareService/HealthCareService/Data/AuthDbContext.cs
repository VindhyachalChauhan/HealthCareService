using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthCareService.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "055d6131-8738-415f-84f7-18e02203687a";
            var writerRoleId = "00adf6fe-27f8-44a6-b925-6692af082cc6";


            // create Reader and Writer Role
            var roles = new List<IdentityRole>()
            {
                new IdentityRole()
                {
                    Id=readerRoleId,
                    Name="Reader",
                    NormalizedName="Reader".ToUpper(),
                    ConcurrencyStamp=readerRoleId

                },
                  new IdentityRole()
                {
                    Id=writerRoleId,
                    Name="Writer",
                    NormalizedName="Writer".ToUpper(),
                    ConcurrencyStamp=writerRoleId

                }
            };

            // Seed the role

            builder.Entity<IdentityRole>().HasData(roles);

            // Create an Admin User
            var adminUserId = "194972f2-fd12-4a41-8a61-11b5db4aa11a";
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@tcs.com",
                Email = "admin@tcs.com",
                NormalizedEmail = "admin@tcs.com".ToUpper(),
                NormalizedUserName = "admin@tcs.com".ToUpper(),
            };
            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");

            builder.Entity<IdentityUser>().HasData(admin);

            //give roles to admin
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId=adminUserId,
                    RoleId=readerRoleId
                },
                new()
                {
                    UserId=adminUserId,
                    RoleId=writerRoleId
                }
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);


        }


    }
}