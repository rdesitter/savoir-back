-- Deploy transmission:1.create_table to pg

BEGIN;

CREATE DOMAIN mail AS TEXT
    CHECK( VALUE ~ '^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$' );

CREATE DOMAIN zip AS TEXT CHECK(   VALUE ~ '^[0-9]{5}$' );


CREATE TABLE IF NOT EXISTS role(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS picture(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "user"(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pseudo TEXT NOT NULL UNIQUE,
    email mail NOT NULL UNIQUE,
    password TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    pronoun TEXT,
    firstname TEXT,
    lastname TEXT,
    postal_code zip,
    description TEXT,
    picture_id INT REFERENCES picture(id) ON DELETE CASCADE,
    role_id INT REFERENCES role(id) ON DELETE CASCADE DEFAULT 2 ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX login ON "user" USING HASH(email);

CREATE TABLE IF NOT EXISTS type(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS condition(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS category(
    id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    postal_code zip DEFAULT '',
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    condition_id INT NOT NULL REFERENCES condition(id) ON DELETE CASCADE,
    type_id INT NOT NULL REFERENCES type(id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES category(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS label(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS belong(
    condition_id INTEGER NOT NULL REFERENCES condition(id) ON DELETE CASCADE,
    label_id INTEGER NOT NULL REFERENCES label(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (condition_id, label_id)
);

CREATE TABLE IF NOT EXISTS get(
    ad_id INTEGER NOT NULL REFERENCES ad(id) ON DELETE CASCADE,
    label_id INTEGER NOT NULL REFERENCES label(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (ad_id, label_id)
);







COMMIT;
