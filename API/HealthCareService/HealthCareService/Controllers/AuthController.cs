

using Azure.Core;
using HealthCareService.Models.DTO;
using HealthCareService.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HealthCareService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(
            UserManager<IdentityUser> userManager,
            ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("login")]
        //public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        //{
        //    //chech Email
        //    var identityUser = await userManager.FindByEmailAsync(request.Email);
        //    if (identityUser is not null)
        //    {
        //        // check Password
        //        var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);

        //        if (checkPasswordResult)
        //        {
        //            var roles = await userManager.GetRolesAsync(identityUser);
        //            //create a token and response

        //            var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());

        //            var response = new LoginResponseDto()
        //            {
        //                Id=identityUser.Id,
        //                Email = request.Email,
        //                Roles = roles.ToList(),
        //                Token = jwtToken
        //            };
        //            return Ok(response);
        //        }
        //    }
        //    ModelState.AddModelError("", "Email or Password Incorrect");

        //    return ValidationProblem(ModelState);
        //}

        [HttpGet]
        [Route("viewprofile/{id:Guid}")]
        public async Task<IActionResult> GetUser([FromRoute] Guid id)
        {
            var identityUser = await userManager.FindByIdAsync(id.ToString());
            if (identityUser is null)
            {
                return NotFound();
            }
            //var response = new UserDto
            //{
            //    Id =Guid.Parse(identityUser.Id),
            //    location = identityUser.Location,
            //    user_email = identityUser.Email,
            //    user_name = identityUser.Name,
            //    password = identityUser.Password,
            //};
            //return Ok(response);
            return Ok(identityUser);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] AddUserRequestDto request)
        {
            // create identityuser object
            var user = new IdentityUser
            {
                Email = request.user_email?.Trim(),
                UserName = request.user_name?.Trim()
            };

            //create user
            var identityResult = await userManager.CreateAsync(user, request.password);
            if (identityResult.Succeeded)
            {
                // add role to user(Reader)
                identityResult = await userManager.AddToRoleAsync(user, "Reader");
                if (identityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);

        }
    }
}