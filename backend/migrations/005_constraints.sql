ALTER TABLE users ADD CONSTRAINT fk_users_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL;
ALTER TABLE environmental_goals ADD CONSTRAINT fk_env_dept FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL;
ALTER TABLE csr_activities ADD CONSTRAINT fk_csr_dept FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL;
ALTER TABLE audits ADD CONSTRAINT fk_audits_dept FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL;
