-- Script para popular o banco de dados com os lançamentos da imagem
-- Mês de referência: Janeiro 2026 (Baseado nos Sábados dias 3, 10, 17, 24, 31)

DELETE FROM transactions; -- Limpa dados antigos (opcional, remova se quiser manter)

INSERT INTO transactions (type, date, description, category, value) VALUES
-- ENTRADAS
('income', '2026-01-03', '1 SEMANA', 'Ofertas', 664.11),
('income', '2026-01-10', '2 SEMANA', 'Ofertas', 1197.22),
('income', '2026-01-17', '3 SEMANA', 'Ofertas', 776.18),
('income', '2026-01-24', '4 SEMANA', 'Ofertas', 422.29),
('income', '2026-01-31', '5 SEMANA', 'Ofertas', 1385.10),

-- SAÍDAS
('expense', '2026-01-05', 'ZELADORA', 'Tesouraria', 2328.39),
('expense', '2026-01-03', 'LIVROS (PARC. 6 a 10)', 'Tesouraria', 1672.50),
('expense', '2026-01-17', 'MATERIAL ESCRITÓRIO', 'Tesouraria', 456.36),
('expense', '2026-01-10', 'PRODUTOS DE LIMPEZA', 'Tesouraria', 337.52),
('expense', '2026-01-24', 'FOLHA MDF SONOPLASTIA', 'Sonoplastia', 255.44),
('expense', '2026-01-31', '6 LAMPADAS - NAVE IGREJA', 'Construção', 173.65),
('expense', '2026-01-31', 'ADT CONSERTO NOBREAK', 'Sonoplastia', 155.00),
('expense', '2026-01-24', 'CÓPIAS DE CHAVES', 'Tesouraria', 150.00),
('expense', '2026-01-10', 'ENERGIA ELÉTRICA', 'Tesouraria', 81.71),
('expense', '2026-01-10', 'CONVENÇÃO AVT', 'Clube dos Aventureiros', 75.00),
('expense', '2026-01-10', 'CONVENÇÃO DBV', 'Clube dos Desbravadores', 75.00),
('expense', '2026-01-03', 'SANTA CEIA', 'Tesouraria', 37.23);
