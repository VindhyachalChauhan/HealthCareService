using Azure.Core;
using HealthCareService.Models.Domain;
using HealthCareService.Models.DTO;
using HealthCareService.Repositories.Implementation;
using HealthCareService.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace HealthCareService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenRepository tokenRepository;

        public UsersController(IUserRepository userRepository, ITokenRepository tokenRepository)
        {
            this.userRepository = userRepository;
            this.tokenRepository = tokenRepository;
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
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var existingUser = await userRepository.GetAsync(id);
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

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid id,UpdateUserDto updateUserDto)
        {
            //convert dto to domain model
            var user = new ApplicationUser
            {
                Id=id,
                user_name = updateUserDto.user_name,
                user_mobile = updateUserDto.user_mobile,
                location = updateUserDto.location,
                user_email=updateUserDto.user_email,
                //password=updateUserDto.password
            };
            
          var updatedUser=  await userRepository.UpdateAsync(user); 
            if (updatedUser is null)
            {
                return NotFound();
            }
            var response = new UpdateUserDto
            {
                user_email = user.user_email,
                user_mobile = user.user_mobile,
                location = user.location,
                user_name = user.user_name,

            };
            return Ok(response);
        }
        
        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignIn(LoginRequestDto user)
        {
            var identityUser = await userRepository.SignInAsync(user);
            if (identityUser is null)
            {
                return NotFound("Invalid User");
            }

            var jwtToken = tokenRepository.CreateJwtToken(identityUser);

            var response = new LoginResponseDto()
            {
                Id = identityUser.Id.ToString(),
                Email = user.Email,
                //Roles = roles.ToList(),
                Token = jwtToken
            };
            return Ok(response);
            //var response = new UserDto
            //{
            //    Id = identityUser.Id,
            //    location = identityUser.location,
            //    user_email = identityUser.user_email,
            //    user_mobile = identityUser.user_mobile,
            //    user_name = identityUser.user_name,
            //    password = identityUser.password,
            //};
            //return Ok(response);


        }
    }
}