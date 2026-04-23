DROP TABLE IF EXISTS member_features;
DROP TABLE IF EXISTS estados;
DROP TABLE IF EXISTS integrantes;

CREATE TABLE integrantes (
    legajo VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL
);

CREATE TABLE estados (
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE member_features (
    id_member_feature SERIAL PRIMARY KEY,
    legajo VARCHAR(20) NOT NULL,
    feature VARCHAR(150) NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    id_estado INT NOT NULL,
    FOREIGN KEY (legajo) REFERENCES integrantes(legajo) ON DELETE CASCADE,
    FOREIGN KEY (id_estado) REFERENCES estados(id_estado)
);

INSERT INTO estados (nombre_estado) VALUES
('activo'),
('inactivo'),
('en_proceso'),
('pendiente');

INSERT INTO integrantes (legajo, nombre, apellido) VALUES
('33535', 'Melissa', 'Braunstein'),
('33514', 'Pilar', 'Wagner'),
('33211', 'Santiago', 'Gonzales D''Angelo'),
('33243', 'Maria Pia', 'Porzio'),
('32201', 'Leandro Andres', 'Noval');

INSERT INTO member_features (legajo, feature, servicio, id_estado) VALUES
('33535', 'Feature 01', 'Coordinador', 1),
('33514', 'Feature 02', 'Frontend', 1),
('33211', 'Feature 03', 'Backend', 1),
('33243', 'Feature 04', 'Database', 3),
('32201', 'Feature 05', 'Portainer', 1);