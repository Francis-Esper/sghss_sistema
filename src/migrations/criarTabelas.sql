-- Tabela de usuários para armazenar pacientes, profissionais e administradores
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Paciente', 'Profissional', 'Administrador')),
    nome_usuario VARCHAR(100) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de log do sistema (ações dos usuários)
CREATE TABLE log_sistema (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_usuario_log FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
);

-- Tabela de leitos hospitalares
CREATE TABLE leito (
    id SERIAL PRIMARY KEY,
    numero INT UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    ocupado BOOLEAN DEFAULT FALSE,
    reservado_por VARCHAR(255),
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW()
);


-- Tabela de pacientes
CREATE TABLE paciente (
    id SERIAL PRIMARY KEY,
    usuario_id INT UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    genero VARCHAR(50),
    telefone_contato VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
);

-- Tabela de profissionais
CREATE TABLE profissional (
    id SERIAL PRIMARY KEY,
    usuario_id INT UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    especialidade VARCHAR(255),
    contato VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_usuario_prof FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
);

-- Tabela de administradores
CREATE TABLE administrador (
    id SERIAL PRIMARY KEY,
    usuario_id INT UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_usuario_admin FOREIGN KEY (usuario_id) REFERENCES usuario (id) ON DELETE CASCADE
);

-- Tabela de agenda para consultas e exames
CREATE TABLE agenda (
    id SERIAL PRIMARY KEY,
    profissional_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Consulta', 'Exame', 'TeleConsulta')),
    data_disponivel TIMESTAMP NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_profissional_agenda FOREIGN KEY (profissional_id) REFERENCES profissional (id) ON DELETE CASCADE
);

-- Tabela de consultas/atendimentos
CREATE TABLE consulta_atendimento (
    id SERIAL PRIMARY KEY,
    id_agenda INT UNIQUE NOT NULL,
    paciente_id INT NOT NULL,
    profissional_id INT NOT NULL,
    data TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Agendada', 'Realizada', 'Cancelada')),
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_agenda FOREIGN KEY (id_agenda) REFERENCES agenda (id) ON DELETE CASCADE,
    CONSTRAINT fk_paciente FOREIGN KEY (paciente_id) REFERENCES paciente (id) ON DELETE CASCADE,
    CONSTRAINT fk_profissional FOREIGN KEY (profissional_id) REFERENCES profissional (id) ON DELETE CASCADE
);

-- Tabela de prontuário médico
CREATE TABLE prontuario (
    id SERIAL PRIMARY KEY,
    paciente_id INT NOT NULL,
    profissional_id INT NOT NULL,
    consulta_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Consulta', 'Exame')),
    observacoes TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    atualizado_em TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_paciente_prontuario FOREIGN KEY (paciente_id) REFERENCES paciente (id) ON DELETE CASCADE,
    CONSTRAINT fk_profissional_prontuario FOREIGN KEY (profissional_id) REFERENCES profissional (id) ON DELETE CASCADE,
    CONSTRAINT fk_consulta_prontuario FOREIGN KEY (consulta_id) REFERENCES consulta_atendimento (id) ON DELETE CASCADE
);