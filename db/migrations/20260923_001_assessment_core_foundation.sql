-- Integral Values / OM.Academy shared Assessment Core
-- MariaDB 10.11+
-- Purpose: cross-project assessment architecture with strict routing between
-- non-clinical application data and future clinical/HDS storage.
-- Source of truth: GitHub. Do not store secrets or identifiable clinical payloads here.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(64) NOT NULL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS core_projects (
  id UUID NOT NULL DEFAULT (UUID()),
  code VARCHAR(64) NOT NULL,
  name VARCHAR(160) NOT NULL,
  project_type ENUM('care','education','coaching','cross_culture','leadership','mixed') NOT NULL DEFAULT 'mixed',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_core_projects_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_lenses (
  id UUID NOT NULL DEFAULT (UUID()),
  code VARCHAR(64) NOT NULL,
  name VARCHAR(120) NOT NULL,
  purpose TEXT NULL,
  default_data_class ENUM('standard','sensitive','clinical') NOT NULL DEFAULT 'standard',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_assessment_lenses_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_instruments (
  id UUID NOT NULL DEFAULT (UUID()),
  code VARCHAR(96) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NULL,
  instrument_family VARCHAR(96) NULL,
  default_context ENUM('coaching','cross_culture','leadership','education','clinical','research','mixed') NOT NULL DEFAULT 'mixed',
  default_data_class ENUM('standard','sensitive','clinical') NOT NULL DEFAULT 'standard',
  default_storage_route ENUM('infomaniak_app','hds_vault','external_licensed','hybrid') NOT NULL DEFAULT 'infomaniak_app',
  license_type ENUM('open','internal','licensed','proprietary','restricted') NOT NULL DEFAULT 'internal',
  copyright_holder VARCHAR(200) NULL,
  license_reference VARCHAR(512) NULL,
  digital_use_authorized BOOLEAN NOT NULL DEFAULT FALSE,
  reproduction_authorized BOOLEAN NOT NULL DEFAULT FALSE,
  is_diagnostic BOOLEAN NOT NULL DEFAULT FALSE,
  requires_human_validation BOOLEAN NOT NULL DEFAULT TRUE,
  status ENUM('draft','active','deprecated','archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_assessment_instruments_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_instrument_lenses (
  instrument_id UUID NOT NULL,
  lens_id UUID NOT NULL,
  lens_role ENUM('primary','supporting','contextual') NOT NULL DEFAULT 'supporting',
  weight DECIMAL(6,3) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (instrument_id, lens_id),
  CONSTRAINT fk_ail_instrument
    FOREIGN KEY (instrument_id) REFERENCES assessment_instruments(id) ON DELETE CASCADE,
  CONSTRAINT fk_ail_lens
    FOREIGN KEY (lens_id) REFERENCES assessment_lenses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_versions (
  id UUID NOT NULL DEFAULT (UUID()),
  instrument_id UUID NOT NULL,
  version_label VARCHAR(96) NOT NULL,
  released_on DATE NULL,
  source_reference VARCHAR(512) NULL,
  licensed_content_ref VARCHAR(512) NULL,
  scoring_strategy_ref VARCHAR(512) NULL,
  status ENUM('draft','active','deprecated','archived') NOT NULL DEFAULT 'draft',
  effective_from DATE NULL,
  effective_to DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_assessment_version (instrument_id, version_label),
  CONSTRAINT fk_assessment_versions_instrument
    FOREIGN KEY (instrument_id) REFERENCES assessment_instruments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_project_access (
  project_id UUID NOT NULL,
  instrument_id UUID NOT NULL,
  surface_name VARCHAR(120) NULL,
  surface_path VARCHAR(255) NULL,
  visibility ENUM('public','authenticated','professional','admin') NOT NULL DEFAULT 'authenticated',
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (project_id, instrument_id),
  CONSTRAINT fk_apa_project
    FOREIGN KEY (project_id) REFERENCES core_projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_apa_instrument
    FOREIGN KEY (instrument_id) REFERENCES assessment_instruments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_questions (
  id UUID NOT NULL DEFAULT (UUID()),
  version_id UUID NOT NULL,
  question_key VARCHAR(96) NOT NULL,
  prompt_text LONGTEXT NULL,
  licensed_content_ref VARCHAR(512) NULL,
  helper_text TEXT NULL,
  input_type ENUM('single','multiple','scale','number','text','date','boolean','custom') NOT NULL DEFAULT 'custom',
  options_json JSON NULL,
  max_score DECIMAL(10,3) NULL,
  position INT NOT NULL DEFAULT 0,
  content_access ENUM('public','authenticated','professional','licensed') NOT NULL DEFAULT 'authenticated',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_assessment_question_key (version_id, question_key),
  KEY idx_assessment_questions_version_position (version_id, position),
  CONSTRAINT fk_assessment_questions_version
    FOREIGN KEY (version_id) REFERENCES assessment_versions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_scoring_rules (
  id UUID NOT NULL DEFAULT (UUID()),
  version_id UUID NOT NULL,
  question_id UUID NULL,
  rule_key VARCHAR(96) NOT NULL,
  rule_json JSON NOT NULL,
  server_only BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_assessment_scoring_rule (version_id, rule_key),
  KEY idx_assessment_scoring_question (question_id),
  CONSTRAINT fk_scoring_version
    FOREIGN KEY (version_id) REFERENCES assessment_versions(id) ON DELETE CASCADE,
  CONSTRAINT fk_scoring_question
    FOREIGN KEY (question_id) REFERENCES assessment_questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_sessions (
  id UUID NOT NULL DEFAULT (UUID()),
  project_id UUID NOT NULL,
  instrument_version_id UUID NOT NULL,
  context_type ENUM('coaching','cross_culture','leadership','education','clinical','research','mixed') NOT NULL,
  subject_ref VARCHAR(128) NOT NULL COMMENT 'Pseudonymous reference only; no direct identity.',
  practitioner_ref VARCHAR(128) NULL COMMENT 'Pseudonymous professional reference when relevant.',
  data_class ENUM('standard','sensitive','clinical') NOT NULL DEFAULT 'standard',
  storage_route ENUM('infomaniak_app','hds_vault','external_licensed','hybrid') NOT NULL DEFAULT 'infomaniak_app',
  external_record_ref VARCHAR(255) NULL COMMENT 'Opaque HDS/external reference; never a clinical payload.',
  status ENUM('created','in_progress','submitted','reviewed','closed','cancelled') NOT NULL DEFAULT 'created',
  started_at DATETIME NULL,
  completed_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_assessment_sessions_subject (subject_ref, created_at),
  KEY idx_assessment_sessions_project (project_id, created_at),
  KEY idx_assessment_sessions_context (context_type, data_class, storage_route),
  CONSTRAINT fk_assessment_sessions_project
    FOREIGN KEY (project_id) REFERENCES core_projects(id) ON DELETE RESTRICT,
  CONSTRAINT fk_assessment_sessions_version
    FOREIGN KEY (instrument_version_id) REFERENCES assessment_versions(id) ON DELETE RESTRICT,
  CONSTRAINT chk_clinical_not_in_app
    CHECK (NOT (data_class = 'clinical' AND storage_route = 'infomaniak_app'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_responses_nonclinical (
  id UUID NOT NULL DEFAULT (UUID()),
  session_id UUID NOT NULL,
  question_id UUID NOT NULL,
  response_json JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_nonclinical_response (session_id, question_id),
  CONSTRAINT fk_nonclinical_response_session
    FOREIGN KEY (session_id) REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  CONSTRAINT fk_nonclinical_response_question
    FOREIGN KEY (question_id) REFERENCES assessment_questions(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Non-clinical only. Clinical response payloads belong in the HDS vault.';

CREATE TABLE IF NOT EXISTS assessment_results_nonclinical (
  id UUID NOT NULL DEFAULT (UUID()),
  session_id UUID NOT NULL,
  lens_id UUID NULL,
  result_key VARCHAR(96) NOT NULL,
  score_json JSON NULL,
  summary_text TEXT NULL,
  generated_by ENUM('deterministic','manual','ai_draft','hybrid') NOT NULL DEFAULT 'deterministic',
  validated_by_ref VARCHAR(128) NULL,
  validated_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_nonclinical_result (session_id, result_key),
  CONSTRAINT fk_nonclinical_result_session
    FOREIGN KEY (session_id) REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  CONSTRAINT fk_nonclinical_result_lens
    FOREIGN KEY (lens_id) REFERENCES assessment_lenses(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Non-clinical outputs only. AI output remains draft until human validation where required.';

CREATE TABLE IF NOT EXISTS integral_synthesis_cases (
  id UUID NOT NULL DEFAULT (UUID()),
  project_id UUID NOT NULL,
  subject_ref VARCHAR(128) NOT NULL,
  purpose ENUM('coaching','cross_culture','leadership','education','clinical','research','integral') NOT NULL DEFAULT 'integral',
  data_class ENUM('standard','sensitive','clinical') NOT NULL DEFAULT 'standard',
  storage_route ENUM('infomaniak_app','hds_vault','external_licensed','hybrid') NOT NULL DEFAULT 'infomaniak_app',
  external_record_ref VARCHAR(255) NULL,
  human_validation_required BOOLEAN NOT NULL DEFAULT TRUE,
  status ENUM('open','draft','review','validated','closed') NOT NULL DEFAULT 'open',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_synthesis_subject (subject_ref, created_at),
  CONSTRAINT fk_synthesis_project
    FOREIGN KEY (project_id) REFERENCES core_projects(id) ON DELETE RESTRICT,
  CONSTRAINT chk_synthesis_clinical_not_in_app
    CHECK (NOT (data_class = 'clinical' AND storage_route = 'infomaniak_app'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS integral_synthesis_inputs (
  synthesis_case_id UUID NOT NULL,
  assessment_session_id UUID NOT NULL,
  lens_id UUID NOT NULL,
  input_role ENUM('primary','supporting','contextual') NOT NULL DEFAULT 'supporting',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (synthesis_case_id, assessment_session_id, lens_id),
  CONSTRAINT fk_synthesis_input_case
    FOREIGN KEY (synthesis_case_id) REFERENCES integral_synthesis_cases(id) ON DELETE CASCADE,
  CONSTRAINT fk_synthesis_input_session
    FOREIGN KEY (assessment_session_id) REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  CONSTRAINT fk_synthesis_input_lens
    FOREIGN KEY (lens_id) REFERENCES assessment_lenses(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_audit_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id UUID NULL,
  session_id UUID NULL,
  actor_ref VARCHAR(128) NULL,
  event_type VARCHAR(96) NOT NULL,
  metadata_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_assessment_audit_project (project_id, created_at),
  KEY idx_assessment_audit_session (session_id, created_at),
  CONSTRAINT fk_audit_project
    FOREIGN KEY (project_id) REFERENCES core_projects(id) ON DELETE SET NULL,
  CONSTRAINT fk_audit_session
    FOREIGN KEY (session_id) REFERENCES assessment_sessions(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Audit metadata only. Never store clinical narrative or secrets here.';

CREATE TABLE IF NOT EXISTS coach_wheel_entries (
  id UUID NOT NULL DEFAULT (UUID()),
  subject_ref VARCHAR(128) NOT NULL COMMENT 'Pseudonymous application subject reference.',
  session_id UUID NULL,
  entry_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  career TINYINT UNSIGNED NOT NULL,
  finances TINYINT UNSIGNED NOT NULL,
  health TINYINT UNSIGNED NOT NULL COMMENT 'Coaching life-domain score; not a clinical diagnosis.',
  family_friends TINYINT UNSIGNED NOT NULL,
  romance TINYINT UNSIGNED NOT NULL,
  personal_growth TINYINT UNSIGNED NOT NULL,
  fun_recreation TINYINT UNSIGNED NOT NULL,
  physical_environment TINYINT UNSIGNED NOT NULL,
  coaching_note VARCHAR(500) NULL COMMENT 'Non-clinical coaching note only.',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_wheel_subject_date (subject_ref, entry_date),
  CONSTRAINT fk_wheel_session
    FOREIGN KEY (session_id) REFERENCES assessment_sessions(id) ON DELETE SET NULL,
  CONSTRAINT chk_wheel_career CHECK (career BETWEEN 1 AND 10),
  CONSTRAINT chk_wheel_finances CHECK (finances BETWEEN 1 AND 10),
  CONSTRAINT chk_wheel_health CHECK (health BETWEEN 1 AND 10),
  CONSTRAINT chk_wheel_family CHECK (family_friends BETWEEN 1 AND 10),
  CONSTRAINT chk_wheel_romance CHECK (romance BETWEEN 1 AND 10),
  CONSTRAINT chk_wheel_growth CHECK (personal_growth BETWEEN 1 AND 10),
  CONSTRAINT chk_wheel_fun CHECK (fun_recreation BETWEEN 1 AND 10),
  CONSTRAINT chk_wheel_environment CHECK (physical_environment BETWEEN 1 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Wheel of Life coaching data only; do not use as a clinical record.';

INSERT INTO core_projects (code, name, project_type)
VALUES
  ('integralvalues', 'Integral Values', 'mixed'),
  ('om_academy', 'OM.Academy', 'education')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  project_type = VALUES(project_type),
  is_active = TRUE;

INSERT INTO assessment_lenses (code, name, purpose, default_data_class)
VALUES
  ('psyche', 'PSYCHÉ', 'Psychology, psychopathology and clinical perspective.', 'clinical'),
  ('coaching', 'COACHING', 'Resources, goals, autonomy and development.', 'standard'),
  ('cross_culture', 'CROSS-CULTURE', 'Values, belonging, adaptation and cultural context.', 'sensitive'),
  ('leadership', 'LEADERSHIP', 'Leadership style, behaviour, relationships and organisation.', 'standard'),
  ('learning', 'LEARN', 'Education, learning, career and potential.', 'standard')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  purpose = VALUES(purpose),
  default_data_class = VALUES(default_data_class);

INSERT INTO schema_migrations (version, description)
VALUES ('20260923_001', 'Shared Assessment Core foundation for Integral Values and OM.Academy')
ON DUPLICATE KEY UPDATE description = VALUES(description);
