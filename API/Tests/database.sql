-- Table: public.system_parameters

-- DROP TABLE public.system_parameters;

CREATE TABLE public.system_parameters
(
    syp_id serial,
    syp_name character varying(100) COLLATE pg_catalog."default",
    syp_description character varying(255) COLLATE pg_catalog."default",
    syp_value character varying(100) COLLATE pg_catalog."default",
    syp_status character varying(100) COLLATE pg_catalog."default",
    syp_create_date timestamp without time zone,
    syp_update_date timestamp without time zone,
    CONSTRAINT system_parameters_pkey PRIMARY KEY (syp_id),
    CONSTRAINT system_parameters_syp_name_key UNIQUE (syp_name)
)

TABLESPACE pg_default;

ALTER TABLE public.system_parameters OWNER to tafia;

-- Table: public.groups

-- DROP TABLE public.groups;

CREATE TABLE public.groups
(
    grp_id serial,
    grp_name character varying(100) COLLATE pg_catalog."default",
    grp_description character varying(255) COLLATE pg_catalog."default",
    grp_status character varying(100) COLLATE pg_catalog."default",
    grp_create_date timestamp without time zone,
    grp_update_date timestamp without time zone,
    CONSTRAINT groups_pkey PRIMARY KEY (grp_id),
    CONSTRAINT groups_grp_name_key UNIQUE (grp_name)
)

TABLESPACE pg_default;

ALTER TABLE public.groups OWNER to tafia;

-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    usr_id serial,
    usr_name character varying(100) COLLATE pg_catalog."default",
    usr_full_name character varying(255) COLLATE pg_catalog."default",
    usr_email character varying(100) COLLATE pg_catalog."default",
    usr_password character varying(100) COLLATE pg_catalog."default",
    usr_grp_id integer,
    usr_status character varying(100) COLLATE pg_catalog."default",
    usr_create_date timestamp without time zone,
    usr_update_date timestamp without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (usr_id),
    CONSTRAINT users_usr_name_key UNIQUE (usr_name),
    CONSTRAINT f_key_usr_grp_id FOREIGN KEY (usr_grp_id)
        REFERENCES public.groups (grp_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to tafia;