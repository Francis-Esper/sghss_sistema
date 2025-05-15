import bcrypt from "bcrypt";

const gerarHash = async () => {
  const senha = "ovo"; 
  const saltRounds = 10; // Número de rounds para o salt
  const hash = await bcrypt.hash(senha, saltRounds);

  console.log("Hash gerado:", hash);
};

gerarHash();
