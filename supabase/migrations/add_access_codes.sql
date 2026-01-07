-- Tabla para códigos de acceso
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  max_uses INTEGER DEFAULT NULL, -- NULL = ilimitado
  current_uses INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas rápidas por código
CREATE INDEX IF NOT EXISTS idx_access_codes_code ON access_codes(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_active ON access_codes(is_active);

-- Tabla para rastrear uso de códigos (opcional, para analytics)
CREATE TABLE IF NOT EXISTS access_code_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id UUID REFERENCES access_codes(id) ON DELETE CASCADE,
  used_at TIMESTAMPTZ DEFAULT NOW(),
  user_identifier TEXT -- Puede ser IP, fingerprint, etc.
);

-- Insertar códigos de prueba
INSERT INTO access_codes (code, description, max_uses, is_active) VALUES
  ('ZEROWASTE2026', 'Código de lanzamiento - ilimitado', NULL, true),
  ('BETA100', 'Código beta - 100 usos', 100, true),
  ('DEMO', 'Código demo - 10 usos', 10, true)
ON CONFLICT (code) DO NOTHING;

-- Función para validar código
CREATE OR REPLACE FUNCTION validate_access_code(input_code VARCHAR(50))
RETURNS TABLE (
  is_valid BOOLEAN,
  code_id UUID,
  message TEXT
) AS $$
DECLARE
  code_record RECORD;
BEGIN
  -- Buscar código
  SELECT * INTO code_record
  FROM access_codes
  WHERE code = input_code;

  -- Código no existe
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, 'Código inválido';
    RETURN;
  END IF;

  -- Código desactivado
  IF NOT code_record.is_active THEN
    RETURN QUERY SELECT false, code_record.id, 'Código desactivado';
    RETURN;
  END IF;

  -- Código expirado
  IF code_record.expires_at IS NOT NULL AND code_record.expires_at < NOW() THEN
    RETURN QUERY SELECT false, code_record.id, 'Código expirado';
    RETURN;
  END IF;

  -- Límite de usos alcanzado
  IF code_record.max_uses IS NOT NULL AND code_record.current_uses >= code_record.max_uses THEN
    RETURN QUERY SELECT false, code_record.id, 'Límite de usos alcanzado';
    RETURN;
  END IF;

  -- Código válido
  RETURN QUERY SELECT true, code_record.id, 'Código válido';
END;
$$ LANGUAGE plpgsql;

-- Función para incrementar contador de usos
CREATE OR REPLACE FUNCTION increment_code_usage(code_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE access_codes
  SET current_uses = current_uses + 1,
      updated_at = NOW()
  WHERE id = code_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE access_codes IS 'Códigos de acceso para controlar uso de la aplicación';
COMMENT ON TABLE access_code_usage IS 'Registro de uso de códigos de acceso';
