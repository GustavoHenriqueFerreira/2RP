using Microsoft.EntityFrameworkCore;
using processoSeletivo.Contexts;
using processoSeletivo.Domains;
using processoSeletivo.Interfaces;
using processoSeletivo.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace processoSeletivo.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {

        private readonly ProcessoContext ctx;

        public UsuarioRepository(ProcessoContext appContext)
        {
            ctx = appContext;
        }

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                if (usuario.Senha.Length < 32)
                {
                    usuario.Senha = Criptografia.GerarHash(usuario.Senha);
                    ctx.Update(usuario);
                    ctx.SaveChanges();
                }
                //Com o Usuario encontrado, temos a hash do banco para poder comparar
                //com a senha vindo do formulário
                bool comparado = Criptografia.Comparar(senha, usuario.Senha);
                if (comparado)
                    return usuario;
            }

            return null;
        }

        public Usuario BuscarId(int id)
        {
            return ctx.Usuarios.Select(U => new Usuario()
            {
                Nome = U.Nome,
                IdTipoUsuario = U.IdTipoUsuario,
                DataNascimento = U.DataNascimento,
                Email = U.Email,
                Imagem = U.Imagem,
                Cpf = U.Cpf,
                IdUsuario = U.IdUsuario,
            })
                .FirstOrDefault(c => c.IdUsuario == id);

        }

  /*      public Usuario Alterar(Usuario usuario)
        {
            ctx.Entry(usuario).State = EntityState.Modified;
            ctx.SaveChangesAsync();
            return usuario;
        }*/
    }
}