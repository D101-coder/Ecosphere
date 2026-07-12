-- Run as migration or via script
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  head VARCHAR(100),
  parent_department_id INT NULL,
  employee_count INT DEFAULT 0,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  department_id INT,
  role ENUM('employee','hr','admin') DEFAULT 'employee',
  profile_pic VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_points (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  points INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS environmental_goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  department_id INT,
  target_co2 DECIMAL(12,2),
  current_co2 DECIMAL(12,2) DEFAULT 0,
  deadline DATE,
  status ENUM('active','on_track','completed') DEFAULT 'active',
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS csr_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  department_id INT,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_participation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  activity_id INT,
  proof_path VARCHAR(255),
  points INT DEFAULT 0,
  approval_status ENUM('pending','approved','rejected') DEFAULT 'pending',
  completion_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS policies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  department_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  department_id INT,
  auditor VARCHAR(150),
  date DATE,
  findings TEXT,
  status ENUM('open','in_progress','closed') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS compliance_issues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  audit_id INT,
  severity ENUM('low','medium','high','critical'),
  description TEXT,
  owner_id INT,
  due_date DATE,
  status ENUM('open','resolved') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  category VARCHAR(100),
  description TEXT,
  xp INT DEFAULT 0,
  difficulty ENUM('easy','medium','hard'),
  evidence_required BOOLEAN DEFAULT TRUE,
  deadline DATE,
  status ENUM('draft','active','under_review','completed','archived') DEFAULT 'draft',
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS challenge_participation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id INT,
  user_id INT,
  progress INT DEFAULT 0,
  proof_path VARCHAR(255),
  approval_status ENUM('pending','approved','rejected') DEFAULT 'pending',
  xp_awarded INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS badges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  description TEXT,
  unlock_rule JSON,
  icon_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rewards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  description TEXT,
  points_required INT,
  stock INT DEFAULT 0,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reward_redemptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  reward_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
