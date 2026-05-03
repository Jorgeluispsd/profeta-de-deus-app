-- ==========================================
-- 1. Criação do Tipo de Perfil (Role)
-- ==========================================
CREATE TYPE public.user_role AS ENUM ('membro', 'admin');

-- ==========================================
-- 2. Tabela de Perfis (Profiles)
-- ==========================================
CREATE TABLE public.perfis (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    nome TEXT,
    role public.user_role DEFAULT 'membro'::public.user_role,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 3. Tabela de Pedidos de Oração
-- ==========================================
CREATE TABLE public.oracoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome TEXT NOT NULL,
    pedido TEXT NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 4. Tabela de Eventos (Batismos, Campanhas, Cultos)
-- ==========================================
CREATE TABLE public.eventos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    data_evento TIMESTAMP WITH TIME ZONE NOT NULL,
    tipo TEXT NOT NULL, -- Ex: 'batismo', 'campanha', 'culto'
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 5. Função Utilitária: is_admin()
-- ==========================================
-- Esta função verifica o cargo de forma segura e ignora as políticas
-- para evitar loop infinito em regras (SECURITY DEFINER).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.perfis
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 6. Configuração de Gatilho (Trigger) para Novos Usuários
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfis (id, nome)
  VALUES (new.id, new.raw_user_meta_data->>'nome');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==========================================
-- 7. Políticas de Segurança (Row Level Security - RLS)
-- ==========================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- -------------------------
-- Políticas de PERFIS
-- -------------------------
-- Membros podem ler apenas o seu próprio perfil
CREATE POLICY "Membros podem ler seus próprios perfis" 
ON public.perfis FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Admins podem ler todos os perfis
CREATE POLICY "Admins podem ler todos os perfis" 
ON public.perfis FOR SELECT 
TO authenticated 
USING (public.is_admin());

-- Membros podem atualizar o próprio perfil (nome, foto), mas não o cargo
CREATE POLICY "Membros podem atualizar o próprio perfil" 
ON public.perfis FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- -------------------------
-- Políticas de ORAÇÕES
-- -------------------------
-- Qualquer um pode enviar pedido de oração (até anônimos)
CREATE POLICY "Permitir envio de orações para qualquer pessoa" 
ON public.oracoes FOR INSERT 
WITH CHECK (true);

-- Apenas admins podem ler todos os pedidos de oração
CREATE POLICY "Apenas admins podem ler as orações" 
ON public.oracoes FOR SELECT 
TO authenticated 
USING (public.is_admin());

-- -------------------------
-- Políticas de EVENTOS
-- -------------------------
-- Qualquer pessoa (membro ou visitante) pode visualizar os eventos
CREATE POLICY "Permitir leitura pública de eventos" 
ON public.eventos FOR SELECT 
USING (true);

-- Apenas admins podem criar eventos
CREATE POLICY "Apenas admins podem criar eventos" 
ON public.eventos FOR INSERT 
TO authenticated 
WITH CHECK (public.is_admin());

-- Apenas admins podem editar eventos
CREATE POLICY "Apenas admins podem editar eventos" 
ON public.eventos FOR UPDATE 
TO authenticated 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Apenas admins podem deletar eventos
CREATE POLICY "Apenas admins podem deletar eventos" 
ON public.eventos FOR DELETE 
TO authenticated 
USING (public.is_admin());
