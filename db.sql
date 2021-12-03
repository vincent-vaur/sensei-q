CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  last_connexion DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  status ENUM(0, 1, 2) DEFAULT 0 COMMENT '0 = created, 1 = validated, 2 = rejected'
);