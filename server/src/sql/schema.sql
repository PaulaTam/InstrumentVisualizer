CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
  artist text NOT NULL,
  released text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, artist, released, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'John Smith', "1987", 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4');

INSERT INTO songs (id, song_title, artist, released, notes) 
VALUES (2, 'Song 2', 'Steve Smith', "2000", 'E4 E4 E1 E3 E1 E3 G4 C4 E4 D4 C4 C4 E4 D4 C4');

INSERT INTO songs (id, song_title, artist, released, notes) 
VALUES (3, 'Song 3', 'Adam Smith', "2003", 'E4 E1 C2 G4 E4 E4 E4 F4 C4 C4 D4 E4 C4 E4 D4 C4');
