using HealthCareService.Models.Domain;
using HealthCareService.Models.DTO;
using HealthCareService.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthCareService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UsersController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] AddUserRequestDto request)
        {
            //map dto to domain model
            var user = new ApplicationUser
            {
                //Id = request.Id,
                location = request.location,
                user_email = request.user_email,
                user_mobile = request.user_mobile,
                password = request.password,
                user_name = request.user_name,
            };

            await userRepository.RegisterAsync(user);

            //domain to dto
            var response = new UserDto
            {
                //Id = user.Id,
                location = user.location,
                user_email = user.user_email,
                user_mobile = user.user_mobile,
                password = user.password,
                user_name = user.user_name,
            };

            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetUser([FromRoute]Guid id)
        {
            var existingUser= await userRepository.GetAsync(id);  
            if (existingUser is null)
            {
                return NotFound();
            }

            var response = new UserDto
            {
                Id = existingUser.Id,
                location = existingUser.location,
                user_email = existingUser.user_email,
                user_mobile = existingUser.user_mobile,
                user_name = existingUser.user_name,
                password = existingUser.password,
            };
            return Ok(response);
        }
    }
}
