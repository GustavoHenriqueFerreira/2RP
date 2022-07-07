using System;
using System.Collections.Generic;

#nullable disable

namespace processoSeletivo.Domains
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public int? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public bool Status { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Cpf { get; set; }
        public string Imagem { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
    }
}
