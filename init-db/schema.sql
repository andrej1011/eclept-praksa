CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE user_role AS ENUM ('user', 'guest', 'admin');
CREATE TYPE booking_status AS ENUM ('active', 'used', 'expired', 'cancelled');

CREATE TABLE "public"."movies" (
    "id" uuid NOT NULL,
    "name" varchar(50) NOT NULL,
    "available" boolean NOT NULL,
    "duration" int NOT NULL,
    "genre_id" uuid,
    "poster_url" varchar(50),
    "short_description" varchar(100),
    "release_date" date,
    "imdb_link" varchar(50),
    PRIMARY KEY ("id")
);
-- Indexes
CREATE INDEX "movies_index_2" ON "public"."movies" ("name");

CREATE TABLE "public"."bookings" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "showing_id" uuid NOT NULL,
    "seats" int NOT NULL,
    "status" booking_status NOT NULL DEFAULT 'active',
    "booked_at" timestamp NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "username" varchar(32) NOT NULL UNIQUE,
    "role" user_role NOT NULL DEFAULT 'user',
    "password" varchar(255) NOT NULL,
    "first_name" varchar(100),
    "last_name" varchar(100),
    "email" varchar(100) UNIQUE,
    "phone_number" varchar(15) UNIQUE,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."showings" (
    "id" uuid NOT NULL,
    "movie_id" uuid NOT NULL,
    "auditorium_id" uuid NOT NULL,
    "start_time" timestamp NOT NULL,
    "booked_seats" int NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."movie_genres" (
    "movie_id" uuid NOT NULL,
    "genre_id" uuid NOT NULL,
    PRIMARY KEY ("movie_id", "genre_id")
);

CREATE TABLE "public"."auditoriums" (
    "id" uuid NOT NULL,
    "name" varchar(30) NOT NULL UNIQUE,
    "capacity" int NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."genres" (
    "id" uuid NOT NULL,
    "name" varchar(30) NOT NULL,
    PRIMARY KEY ("id")
);

-- Foreign key constraints
-- Schema: public
ALTER TABLE "public"."showings" ADD CONSTRAINT "fk_showings_auditorium_id_auditoriums_id" FOREIGN KEY("auditorium_id") REFERENCES "public"."auditoriums"("id");
ALTER TABLE "public"."movie_genres" ADD CONSTRAINT "fk_movie_genres_genre_id_genres_id" FOREIGN KEY("genre_id") REFERENCES "public"."genres"("id");
ALTER TABLE "public"."movie_genres" ADD CONSTRAINT "fk_movie_genres_movie_id_movies_id" FOREIGN KEY("movie_id") REFERENCES "public"."movies"("id");
ALTER TABLE "public"."bookings" ADD CONSTRAINT "fk_bookings_showing_id_showings_id" FOREIGN KEY("showing_id") REFERENCES "public"."showings"("id");
ALTER TABLE "public"."showings" ADD CONSTRAINT "fk_showings_movie_id_movies_id" FOREIGN KEY("movie_id") REFERENCES "public"."movies"("id");
ALTER TABLE "public"."bookings" ADD CONSTRAINT "fk_bookings_user_id_users_id" FOREIGN KEY("user_id") REFERENCES "public"."users"("id");