CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, notes) 
VALUES (2, 'Song 2', 'E4 E4 E1 E3 E1 E3 G4 C4 E4 D4 C4 C4 E4 D4 C4');

INSERT INTO songs (id, song_title, notes) 
VALUES (3, 'Song 3', 'E4 E1 C2 G4 E4 E4 E4 F4 C4 C4 D4 E4 C4 E4 D4 C4');
