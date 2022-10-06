-- Deploy savoir:2.seeding to pg

BEGIN;

TRUNCATE "role", "picture", "user", "type", "condition", "ad", "label", "category", "belong", "get" RESTART IDENTITY;

INSERT INTO "role"(name) VALUES
('Admin'),
('User');


INSERT INTO "picture" (name, slug) VALUES 
('null', 'null'),
('beard1', 'beard1'),
('hijab1', 'hijab1'),
('long1', 'long1');

INSERT INTO "user" (pseudo, email, password, birthdate, pronoun, firstname, lastname, postal_code, description, picture_id, role_id, created_at, updated_at) VALUES
('Titus', 'titus@mail.com', 'titusdu33', '1980-09-26', 'monsieur', 'Eric', 'Dupont', '33000', 'Une description', 1, 2, now(), now()),
('Radus', 'Radus@mail.com', 'titusdu24', '1990-01-05', 'monsieur', 'Patrick', 'Machin', '24000', 'Une seconde description', 3, 2, now(), now()),
('mimi', 'mimi@mail.com', 'mimidu40', '1990-12-20', 'madame', 'Emilie', 'Fretou', '40000', 'Une dernière description', 2, 1, now(), now());


INSERT INTO "type" (name) VALUES
('Recherche'),
('Propose');

INSERT INTO "condition" (name) VALUES
('Présentiel'),
('Distanciel');

INSERT INTO "category" (name, slug, created_at, updated_at) VALUES
('Informatique', 'informatique', now(), now()),
('Cuisine', 'cuisine', now(), now()),
('Aide éducative', 'aide-educative', now(), now());

INSERT INTO "ad" (title, postal_code, image, description, user_id, condition_id, type_id, category_id, created_at, updated_at) VALUES
('Gimp', 33000, 'image-de-gimp', 'J’aimerais apprendre à me servir du logiciel Gimp. Je suis totalement débutant mais j’ai déjà installé le logiciel (je suis sur Ibook). J’aimerais organiser ça dans un café ou un bar, j’offre la première consommation ! Pour info, j’ai de bonnes notions Photoshop. Ca serait sympa de profiter du beau temps pour organiser ça :)', 1, 2, 1, 1, now(), now()),
('Pâtisseries marocaines', 35410, 'image-de-patisserie', 'Si vous avez envie de gourmandises, je peux vous apprendre la pâtisserie marocaine. Je vous accueille chez moi, en groupe, jusqu’à 5 personnes. Enfants bienvenus ! Nous pourrons partager nos petites douceurs autour d’un bon thé :) Contactez-moi si vous avez des questions.', 2, 1, 2, 2, now(), now()),
('Langue des signes', 40000, 'image', 'Bonjour. J’aimerais offrir un cadeau un peu spécial à ma tante pour Noël. Elle est malentendante et j’adorerais pouvoir apprendre les bases du langage des signes pour papoter avec elle le 25 décembre :) Pourriez-vous m’aider ? Je peux me déplacer sur Paris mais je préfèrerais en distanciel.', 3, 2, 1, 3, now(), now());

INSERT INTO "label" (name, slug, created_at, updated_at) VALUES
('Mixité', 'mixité', now(), now()),
('Non-fumeur', 'non-fumeur', now(), now()),
('Matériel fourni', 'matériel-fourni', now(), now()),
('Stimming friendly', 'stimming-friendly', now(), now())
;

INSERT INTO "belong" (condition_id, label_id, created_at) VALUES
(1, 1, now()),
(1, 2, now()),
(1, 3, now()),
(2, 1, now()),
(2, 4, now());

INSERT INTO "get" (ad_id, label_id, created_at) VALUES
(1, 1, now()),
--! example pour plusieurs label
(2, 2, now()),
(2, 3, now()),
(3, 3, now());

COMMIT;
