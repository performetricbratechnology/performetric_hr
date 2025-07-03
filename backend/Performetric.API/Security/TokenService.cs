using System;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Performetric.API.Models;
using Performetric.API.Security;

namespace Performetric.API.Security
{
    public class TokenService
    {
        public string Generate(User user)
        {
            var handler = new JwtSecurityTokenHandler();

            var keyBytes = Convert.FromBase64String(Configuration.PrivateKey);
            var key = new SymmetricSecurityKey(keyBytes);
            
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.MailId),
                new Claim(ClaimTypes.Role, user.IsStaff ? "admin" : "user")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = credentials
            };

            var token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }
    }
}
