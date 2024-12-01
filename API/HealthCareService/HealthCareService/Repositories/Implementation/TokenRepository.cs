﻿using HealthCareService.Models.Domain;
using HealthCareService.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthCareService.Repositories.Implementation
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration configuration;

        public TokenRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        //public string CreateJwtToken(IdentityUser user, List<string> roles)
        public string CreateJwtToken(ApplicationUser user)
        {
            //Create claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.user_email)
            };
            //claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            //JWT security Token parameter

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
                );
            //Return token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}