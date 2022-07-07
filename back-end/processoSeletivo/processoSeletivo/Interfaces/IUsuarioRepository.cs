using processoSeletivo.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace processoSeletivo.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario Login(string email, string senha);

        /// <summary>
        /// Metodo responsavel por buscar um ususario especifico pelo ID
        /// </summary>
        /// <param name="id">Id a ser buscado</param>
        /// <returns>Um usuario especifico</returns>
        Usuario BuscarId(int id);
/*
        Usuario Alterar(Usuario usuario);*/
    }
}
