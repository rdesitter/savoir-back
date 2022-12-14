-- Deploy savoir:2.seeding to pg

BEGIN;

TRUNCATE "role", "picture", "user", "type", "condition", "ad", "label", "category", "belong", "get" RESTART IDENTITY;

INSERT INTO "role"(name) VALUES
('Admin'),
('User');

INSERT INTO "picture" (name, slug) VALUES 
('NULL', 'null'),
('BEARD1', 'beard-1'),
('BEARD2', 'beard-2'),
('BEARD3', 'beard-3'),
('HIJAB1', 'hijab-1'),
('HIJAB2', 'hijab-2'),
('HIJAB3', 'hijab-3'),
('LONG1', 'long-1'),
('LONG2', 'long-2'),
('LONG3', 'long-3'),
('nohair1', 'nohair-1'),
('NOHAIR2', 'nohair-2'),
('NOHAIR3', 'nohair-3'),
('RAD1', 'rad-1'),
('RAD2', 'rad-2'),
('RAD3', 'rad-3'),
('SHORT1', 'short-1'),
('SHORT2', 'short-2'),
('SHORT3', 'short-3');

INSERT INTO "user" (pseudo, email, password, birthdate, pronoun, firstname, lastname, postal_code, description, picture_id, role_id, created_at, updated_at) VALUES
('Ericou', 'ericou@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
1, 1, now(), now()),
('Michou', 'micou@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
10, 1, now(), now()),
('Mimi', 'mimi@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
7, 1, now(), now()),
('Mati', 'mati@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
5, 1, now(), now()),
('Titus', 'titus@mail.com', '123', '01/01/1900', 'pronoun', 'firstname', 'lastname', '01000', 'Une description : Lorem ipsum dolor sit amet. Ea necessitatibus adipisci qui vitae soluta est dignissimos distinctio animi voluptas. At temporibus harum ut iusto facilis ut inventore iste est culpa magni. In accusantium itaque est nihil galisum qui illo illo eum totam quod sed iure mollitia id corporis distinctio. Et veniam dignissimos cum animi ratione in nulla voluptatem?',
17, 1, now(), now());

INSERT INTO "type" (name) VALUES
('Recherche'),
('Propose');

INSERT INTO "condition" (name) VALUES
('Pr??sentiel'),
('Distanciel');

INSERT INTO "category" (name, slug, created_at, updated_at) VALUES
('Administration', 'administration', now(), now()),
('Aide ??ducative', 'aide-educative', now(), now()),
('Animaux', 'animaux', now(), now()),
('Arts / travaux manuels', 'arts-travaux', now(), now()),
('Bien-??tre', 'bien-etre', now(), now()),
('Cuisine', 'cuisine', now(), now()),
('D??couverte m??tier', 'decouverte-metier', now(), now()),
('Informatique', 'informatique', now(), now()),
('Jardin', 'jardin', now(), now()),
('Langues', 'langues', now(), now()),
('Partage culturel', 'partage-culturel', now(), now()),
('R??paration / bricolage', 'reparation-bricolage', now(), now()),
('Sport', 'sport', now(), now());

INSERT INTO "ad" (title, postal_code, image, description, user_id, condition_id, type_id, category_id, created_at, updated_at) VALUES
--RECHERCHE
('Initiation au th????tre d''impro, ou pas !)', '13000', 'arts-travaux', 'Bonjour, Tr??s timide, je cherche un groupe de th????tre bienveillant pour apprendre ?? g??rer mon angoisse de parler en public et gagner en assurance :) Je suis fascin?? par le th????tre impro, alors un groupe de ce type serait un plus !)', 1, 1, 1, 4, now(), now()),

('Balade avec les toutous !', '33000', 'animaux', 'Bonjour bonjour ! Si ??a en tente certains??es, nous pourrions promener nos loulous ensemble, le dimanche matin ! Je vous propose de nous retrouver dans le parc ?? chien du Jardin Public. Ensite, nous pourrions nous balader le long de la Garonne :)', 2, 1, 1, 3, now(), now()),

('Gimp', '34000', 'informatique', 'J''aimerais apprendre ?? me servir du logiciel Gimp. Je suis totalement d??butant mais j''ai d??j?? install?? le logiciel (je suis sur Ibook). J''aimerais organiser ??a dans un caf?? ou un bar, j''offre la premi??re consommation ! Pour info, j''ai de bonnes notions Photoshop. Ca serait sympa de profiter du beau temps pour organiser ??a :)', 3, 1, 1, 8, now(), now()),

('Si la Bourse n''a plus de secret pour vous???', '01000', 'administration', 'Bonjour ! Tr??s int??ress?? par le milieu boursier, j''aimerais parfaire mes connaissances dans le domaine. Si j''ai quelques notions, du vocabulaire, etc, je peine encore ?? bien comprendre ses m??canismes et adorerait pouvoir b??n??ficier de vos lumi??res sur le sujet. Papoter avec une personne ayant boss?? chez Euronex et pouvant me raconter les coulisses serait un r??ve !', 4, 2, 1, 1, now(), now()),

('Langue des signes', '01000', 'langues', 'Bonjour. J''aimerais offrir un cadeau un peu sp??cial ?? ma tante pour No??l. Elle est malentendante et j''adorerais pouvoir apprendre les bases du langage des signes pour papoter avec elle le 25 d??cembre :) Pourriez-vous m''aider ? Je peux me d??placer sur Paris mais je pr??f??rerais en distanciel.', 5, 2, 1, 10, now(), now()),

('Visite guid??e du Mont St Michel', '50170', 'partage-culturel', 'Bonjour ! je cherche un ou une guide pour visiter le Mont St Michel avec ma famille (enfants et adultes). Une personne habitant les lieux serait un plus. Nous aimerions ??tre immerg??s dans l''histoire mais aussi la vie du lieu ! Nous sommes du coin alors on peut s''arranger sur la date. Le dimanche de pr??f??rence.', 5, 1, 1, 11, now(), now()),

('Cherche initiation ?? la m??ditation - enfant TSA', '75006', 'bien-etre', 'Je cherche une personne bienveillante acceptant d''initier mon fils de 13 ans ?? la m??ditation. Il a un TSA et est sujet ?? des crises. J''aimerais voir si cela pourrait l''aider ?? les g??rer. A mon domicile de pr??f??rence pour lui permettre d''??tre dans un cadre rassurant.', 4, 1, 1, 5, now(), now()),

('V??lo ?? r??nover', '33000', 'reparation-bricolage', 'Bonjour tout le monde. Je viens de r??cup??rer un vieux v??lo qui m??riterait quelques r??parations. Si quelqu''un pouvait me filer un coup de main ? J''adorerais le faire seul mais je n''y connais pas grand''chose. J''ai r??cup??r?? quelques outils et pi??ces d??tach??es mais vu que je sais m??me pas si ??a va me servir??? j''aurais aussi besoin d''un brief l??-dessus :D Merci !',
3, 1, 1, 12, now(), now()),

('Programmation de jeux vid??os', '62140', 'decouverte-metier', 'Bonjour ! J ai 13 ans et je dois faire un stage en entreprise de deux semaines. Passionn??e de jeux vid??os, j adorerais pouvoir le faire aupr??s d un programmeur ou d une programmatrice dans le domaine. Je suis ?? la recherche de ce stage pour le mois de novembre et je peux me d??placer dans un rayon de 30km autour de Hesdin. le distanciel est aussi possible (merci le covid !).', 2, 1, 1, 7, now(), now()),

('Echecs en plein air', '69006', 'sport', 'Bonjour. Je cherche des partenaires au niveau confirm?? pour jouer aux ??checs au Parc de la T??te d Or. De pr??f??rence le week-end en d??but d apres midi. J am??ne le caf?? ! Me contacter pour qu on se donne rendez-vous.', 1, 1, 1, 13, now(), now()),

('Nems \o/', '01000', 'cuisine', 'Bonjour. J adore les nems (surtout v??g??s !) mais je ne sais absolument pas les cuisiner... et encore moins les rouler ! Est-ce qu une bonne ??me saurait m apprendre ??', 2, 1, 1, 6, now(), now()),

('Soutien scolaire, physique/chimie', '17600', 'Aide-educative', 'El??ve en classe de 5??me, la physique et la chimie me posent beaucoup de probl??me. Est-ce qu une personne pourrait m aider ?? me remettre ?? niveau ?', 3, 2, 1, 2, now(), now()),

--PORPOSE

('Amigurumi niveau avanc??', '67202', 'arts-travaux', 'Bonjour ! Pratiquant le crochet depuis des lustres, je me suis sp??cialis??e dans la confection d amigurumis. Si vous avez envie de progresser dans ce domaine, je me propose de partager avec vous mes techniques et astuces pour rendre vos cr??ations toujours plus abouties ! Conna??tre les bases est imp??ratif (au moins le cercle magique (magic ring), la maille serr??e (single crochet) et la lecture de patrons).', 1, 1, 2, 4, now(), now()),

('Montage d''un PC', '37000', 'informatique', 'Bonjour ! jeune homme trans, je vous propose de vous apprendre ?? monter votre PC vous-m??me, chez moi, en petit groupe non mixte LGBTQIA+. Pour info, j''ai deux gros chiens et un jardin s??curis??. Si vous en avez, ils pourront s''??clater dehors pendant qu''on bosse :D Mat??riel de d??mo fourni. Contact pour plus d''infos.', 4, 1, 2, 8, now(), now()),

('Aide paperasse administrative (CAF, CMU???)', '13002', 'administration', 'Bonjour. Ancien employ?? de la CAF, je peux vous aider ?? remplir votre paperasse administrative. CME, CMU, demande d''allocation, etc. ??a pourrait ??tre sympa de faire ??a dans le secteur du Vieux Port :) Dispo de pr??f??rence en semaine, apr??s 16h. Et pour info, je parle couramment arabe et me d??brouille en anglais.', 5, 1, 2, 1, now(), now()),

('L''aquariophilie et les crevettes naines, ??a vous parle ?', '69005', 'animaux', 'Aquariophile passionn??e, je poss??de plusieurs aquariums d''eau douce, dont un de n??ocaridina blue velvet. Je vous propose de vous aider dans l''installation de votre aquarium sp??cifique crevettes, pour en faire un lieu de vie parfait pour ces petites b??b??tes ! Nous pourrons en discuter au t??l??phone ou en visio dans un premier temps, puis je peux me d??placer chez vous (mobilit?? : transports en commun) pour l''installation concr??te de l''aquarium. N''h??sitez pas ?? me contacter !', 4, 1, 2, 3, now(), now()),

('Football pour amput??s', '60000', 'sport', 'Entra??neur ?? la retraite, ancien m??daill?? des jeux paralympiques, je propose de vous faire d??couvrir le foot pour amput?? (adultes et enfants) le week-end. Tenue de sport obligatoire. Le reste du mat??riel sera fourni. Plus d''infos : me contacter.', 2, 1, 2, 13, now(), now()),

('Soutien lecture ??criture fran??ais', '44000', 'aide-educative', 'Professeure de fran??ais ?? la retraite, je souhaiterais aider les femmes adultes en grande pr??carit?? et/ou ??trang??res ?? acqu??rir des bases solides en ??criture et lecture. La biblioth??que de Nantes dispose de salles que l''on peut privatiser pour travailler en petit groupe, gratuitement. horaires ?? d??finir ensemble. Je fournis le mat??riel n??cessaire (crayon, cahier, livre???).', 3, 1, 2, 2, now(), now()),

('P??tisseries marocaines', '35410', 'cuisine', 'Si vous avez envie de gourmandises, je peux vous apprendre la p??tisserie marocaine. Je vous accueille chez moi, en groupe, jusqu''?? 5 personnes. Enfants bienvenus ! Nous pourrons partager nos petites douceurs autour d''un bon th?? :) Contactez-moi si vous avez des questions.', 5, 1, 2, 6, now(), now()),

('Massage des mains ?? la pierre chaude', '25056', 'bien-etre', 'Bonjour ! Esth??ticienne professionnelle, je vous propose de d??couvrir le massage des mains ?? la pierre chaude pour vous d??tendre apr??s une dure journ??e de travail ! Je vous accueillerai dans mon salon enti??rement accessible aux personnes en situation de handicap. Non-mixit?? : femmes. Chiens guides accept??s.', 1, 1, 2, 5, now(), now()),

('Petite plomberie', '17000', 'reparation-bricolage', 'Bonjour, bonsoir. Retrait?? bricoleur, je vous propose de petits travaux de plomberie chez vous. Je pourrais vous apprendre au passage les petites choses utiles qui vous ??viteront d''avoir ?? faire appel ?? un plombier pour les r??parations simples. Au plaisir de vous rencontrer.', 2, 1, 2, 12, now(), now()),

('Souffleur de verre', '63000', 'decouverte-metier', 'Bonjour. Ma??tre verrier, ce serait avec plaisir que je vous ferai d??couvrir mon m??tier de souffleur de verre. Nous serons en petits groupes, ?? mon atelier. Les enfants sont les bienvenus, mais compte tenu de la chaleur et de la pratique tr??s d??licate du mat??riau, je pr??f??re r??server cette d??couverte ?? partir de 13 ans.', 5, 1, 2, 7, now(), now()),

('Parlons de l''Ecosse !', '62100', 'partage-culturel', 'Edimbourgeois exil?? en France depuis ma retraite, ??a me manque souvent de pouvoir parler de mon beau pays ! Je vous propose d ??changer ?? ce sujet, que vous souhaitiez d??couvrir ma culture ou ??changer ?? propos de vos propres voyages dans les Highlands... Rencontrons-nous dans un petit bar du centre, acc??s PMR sans probl??me ! Adresse une fois la prise de contact faite.', 3, 1, 2, 11, now(), now()),

('Cours d Ukrainien pour d??butants-es', '75006', 'langues', 'Bonsoir. Compte tenu du contexte actuel et par souci de solidarit?? pour les personnes accueillant des r??fugi??s, je propose de vous apprendre les bases de la langue ukrinienne. J ai v??cu une dizaine d ann??es l?? bas et suis parfaitement bilingue. Nous pourrions nous retrouver autour d un bon repas au Pirojki bar, dans le 9e. Attention, tol??rance z??ro pour les d??bats politiques sur le sujet :)', 1, 1, 2, 10, now(), now());


INSERT INTO "label" (name, slug, created_at, updated_at) VALUES
('Accessible PMR', 'accessible-PMR', now(), now()),
('Animal', 'animal', now(), now()),
('Ascenseur', 'ascenseur', now(), now()),
('Delete', 'delete', now(), now()),
('Enfant', 'enfant', now(), now()),
('Fumeur', 'fumeur', now(), now()),
('Github', 'github', now(), now()),
('Linkedin', 'linkedin', now(), now()),
('Location', 'location', now(), now()),
('Malentendant', 'malentendant', now(), now()),
('Malvoyant', 'malvoyant', now(), now()),
('Mixite', 'mixite', now(), now()),
('Outils', 'outils', now(), now()),
('Parking', 'parking', now(), now()),
('Personnes', 'personnes', now(), now()),
('Profil', 'profil', now(), now()),
('Rafraichissement', 'rafraichissement', now(), now());

INSERT INTO "belong" (condition_id, label_id, created_at) VALUES
(1, 1, now()),
(1, 2, now()),
(1, 3, now()),
(2, 1, now()),
(2, 4, now());

INSERT INTO "get" (ad_id, label_id, created_at) VALUES
(1, 1, now()),
(2, 2, now()),
(2, 3, now()),
(3, 3, now());

COMMIT;
