using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using processoSeletivo.Domains;
using processoSeletivo.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace processoSeletivo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioInfoController : ControllerBase
    {
        private readonly IUsuarioRepository _context;

        public UsuarioInfoController(IUsuarioRepository context)
        {
            _context = context;
        }

        /// <summary>
        /// Metodo para buscar informações de um usuario especifico
        /// </summary>
        /// <returns>Usuario com o id igual ao enviado</returns>
        [Authorize]
        [HttpGet]
        public IActionResult Buscar()
        {
            try
            {
                int id = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(_context.BuscarId(id));

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }


       /* [HttpPut("{idUsuario}")]
        public IActionResult Atualizar(int idUsuario, Usuario usuario)
        {
            try
            {
                _context.Alterar(idUsuario, usuario);

                return StatusCode(204);
            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }*/
    }
}
