USE rpDB
GO

set dateformat ymd;
GO

INSERT INTO tipoUsuario(nomeTipo)
VALUES ('Geral'),('Admin'),('Root');
GO

INSERT INTO usuario(idTipoUsuario, nome, email, senha, status, dataNascimento, cpf)
VALUES (1,'Gustavo Henrique Ferreira Alves', 'gustavo@2rp.com', 'gustavo123', 1, '2004-12-24', 17259291929), 
       (2,'René Esteves Lima', 'rene@2rp.com','rene123', 1, '1995-10-20', 16184818491), 
	   (3,'Paulo Roberto Pereira', 'paulo@2rp.com','paulo123', 1, '1985-11-24', 92729502858),
	   (1,'Fernando Gomes Souza', 'fernando@2rp.com','fernando123', 0, '2000-12-24', 19837392758);
GO


INSERT INTO usuario(idTipoUsuario, nome, email, senha, status, dataNascimento, cpf)
VALUES (1,'Carlos Roque', 'carlos@2rp.com', 'carlos123', 1, '2004-12-24', 37259291929), 
GO