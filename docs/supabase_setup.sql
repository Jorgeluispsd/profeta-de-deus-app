-- Execute este código no "SQL Editor" do seu painel do Supabase

-- 1. Tabela de Pedidos de Oração
CREATE TABLE oracoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome TEXT NOT NULL,
    pedido TEXT NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS (Row Level Security) para oracoes
ALTER TABLE oracoes ENABLE ROW LEVEL SECURITY;

-- Permitir inserção anônima (para qualquer pessoa que baixe o app)
CREATE POLICY "Permitir inserção anônima em oracoes" 
ON oracoes FOR INSERT 
TO anon
WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados (opcional, para um painel admin)
CREATE POLICY "Permitir leitura para autenticados em oracoes" 
ON oracoes FOR SELECT 
TO authenticated 
USING (true);


-- 2. Tabela de Eventos (Batismos, Campanhas, etc)
CREATE TABLE eventos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_evento TIMESTAMP WITH TIME ZONE NOT NULL,
    tipo TEXT NOT NULL, -- Ex: 'batismo', 'campanha', 'festividade'
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS para eventos
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

-- Permitir leitura anônima (para listar os eventos no app)
CREATE POLICY "Permitir leitura anônima de eventos" 
ON eventos FOR SELECT 
TO anon 
USING (true);

-- (Nota: Para INSERIR eventos, idealmente você usará o painel do Supabase ou criará um app Admin separado)
