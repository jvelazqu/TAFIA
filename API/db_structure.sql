-- CREATE USER tafia WITH PASSWORD 'tafia123';
-- DROP DATABASE IF EXISTS tafia;
-- CREATE DATABASE tafia OWNER = tafia;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

-- ============================================================================
--
-- Name: system_parameters; Type: TABLE; Schema: public; Owner: tafia
--

DROP TABLE IF EXISTS system_parameters CASCADE;

CREATE TABLE system_parameters (
	syp_id serial PRIMARY KEY,
    syp_name character varying(100) UNIQUE,
	syp_description character varying(255),
	syp_value character varying(100),
    syp_status character varying(100),
	syp_create_date TIMESTAMP,
	syp_update_date TIMESTAMP
);

ALTER TABLE system_parameters OWNER TO tafia;

INSERT INTO system_parameters 
	(syp_name,syp_description,syp_value,syp_status,syp_create_date,syp_update_date)
VALUES 
	('site_title','Title of the site','tafia','On',NOW(),NOW());
INSERT INTO system_parameters 
	(syp_name,syp_description,syp_value,syp_status,syp_create_date,syp_update_date)
VALUES 
	('default_location','Default location','MX','On',NOW(),NOW());
	
	
--
-- Name: v_get_system_parameters; Type: VIEW; Schema: public; Owner: tafia
--

DROP VIEW IF EXISTS v_get_system_parameters;

CREATE VIEW v_get_system_parameters AS
   SELECT 
    syp.*
   FROM system_parameters syp;
   
 ALTER VIEW v_get_system_parameters OWNER TO tafia;
 
-- SELECT * FROM v_get_system_parameters;

-- ============================================================================
--
-- Name: v_get_all_system_parameters; Type: VIEW; Schema: public; Owner: tafia
--	
DROP VIEW public.v_get_all_system_parameters;

CREATE OR REPLACE VIEW public.v_get_all_system_parameters
 AS
 SELECT syp.syp_id,
    syp.syp_name,
    syp.syp_description,
    syp.syp_value,
    syp.syp_status,
    to_char(syp.syp_create_date,'YYYY-MM-DD HH24:MI:SS') AS syp_create_date,
    to_char(syp.syp_update_date,'YYYY-MM-DD HH24:MI:SS') AS syp_update_date
   FROM system_parameters syp;

ALTER TABLE public.v_get_all_system_parameters OWNER TO tafia;

--- SELECT * FROM v_get_all_system_parameters;

-- ============================================================================
--
-- Name: groups; Type: TABLE; Schema: public; Owner: tafia
--

DROP TABLE IF EXISTS groups CASCADE;

CREATE TABLE groups (
	grp_id serial  PRIMARY KEY,
    grp_name character varying(100) UNIQUE,
	grp_description character varying(255),
    grp_status character varying(100),
	grp_create_date TIMESTAMP,
	grp_update_date TIMESTAMP
);

ALTER TABLE groups OWNER TO tafia;

INSERT INTO groups (grp_name,grp_description,grp_status,grp_create_date,grp_update_date)
VALUES ('Administrators','Administrators group', 'On', NOW(), NOW());
INSERT INTO groups (grp_name,grp_description,grp_status,grp_create_date,grp_update_date)
VALUES ('Supervisors','Supervisors group', 'On', NOW(), NOW());
INSERT INTO groups (grp_name,grp_description,grp_status,grp_create_date,grp_update_date)
VALUES ('Operators','Operators group', 'On', NOW(), NOW());

-- ============================================================================
--
-- Name: v_get_groups; Type: VIEW; Schema: public; Owner: tafia
----

DROP VIEW IF EXISTS v_get_groups;

CREATE VIEW v_get_groups AS
   SELECT 
    grp.*
   FROM groups grp;
   
 ALTER VIEW v_get_groups OWNER TO tafia;
 
-- SELECT * FROM v_get_groups;

-- ============================================================================
--
-- Name: v_get_all_groups; Type: VIEW; Schema: public; Owner: tafia
--
DROP VIEW public.v_get_all_groups;

CREATE OR REPLACE VIEW public.v_get_all_groups
 AS
 SELECT grp.grp_id,
    grp.grp_name,
    grp.grp_description,
    grp.grp_status,
	to_char(grp.grp_create_date, 'YYYY-MM-DD HH24:MI:SS') AS grp_create_date,
	to_char(grp.grp_update_date, 'YYYY-MM-DD HH24:MI:SS') AS grp_update_date
   FROM groups grp;

ALTER TABLE public.v_get_all_groups OWNER TO tafia;

--- SELECT * FROM v_get_all_groups;
	
-- ============================================================================
--
-- Name: users; Type: TABLE; Schema: public; Owner: tafia
--

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	usr_id serial PRIMARY KEY,
    usr_name character varying(100) UNIQUE,
	usr_full_name character varying(255),
	usr_email character varying(100),
	usr_password character varying(100),
	usr_grp_id integer,
    usr_status character varying(100),
	usr_create_date TIMESTAMP,
	usr_update_date TIMESTAMP,
	CONSTRAINT f_key_usr_grp_id FOREIGN KEY (usr_grp_id)
        REFERENCES public.groups (grp_id)
);

ALTER TABLE users OWNER TO tafia;

INSERT INTO public.users(usr_name, usr_full_name, usr_email, usr_password, usr_grp_id, usr_status, usr_create_date, usr_update_date)
VALUES ('jvelazqu', 'Jesus Velazquez', 'jesus.velazquez@i-btest.com', '$2a$10$WuA7HV8FafoichqV5FkjO.Abq3npVoHxag8nQglAIgdZYSiactX5K', '1', 'On', NOW(), NOW());
	
--
-- Name: v_get_users; Type: VIEW; Schema: public; Owner: tafia
--

DROP VIEW IF EXISTS v_get_all_users;

CREATE VIEW v_get_all_users AS
   SELECT 
    usr.*
   FROM users usr;
   
 ALTER VIEW v_get_all_users OWNER TO tafia;
 
-- SELECT * FROM v_get_all_users;

--
-- Name: v_get_users; Type: VIEW; Schema: public; Owner: tafia
--

DROP VIEW IF EXISTS v_get_users;

CREATE VIEW v_get_users AS
   SELECT 
    usr.*
   FROM users usr;
   
 ALTER VIEW v_get_users OWNER TO tafia;
 
-- SELECT * FROM v_get_users;

-- ============================================================================
--
-- Name: product_types; Type: TABLE; Schema: public; Owner: tafia
--

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
	prj_id serial PRIMARY KEY,
    prj_name character varying(100) UNIQUE,
    prj_status character varying(100),
	prj_create_date TIMESTAMP,
	prj_update_date TIMESTAMP
);

ALTER TABLE projects OWNER TO tafia;


--
-- Name: v_get_projects; Type: VIEW; Schema: public; Owner: tafia
--

DROP VIEW IF EXISTS v_get_projects;

CREATE VIEW v_get_projects AS
   SELECT 
    prj.*
   FROM projects prj;
   
 ALTER VIEW v_get_projects OWNER TO tafia;
 
-- SELECT * FROM v_get_projects;

--
-- Name: process_actions; Type: TABLE; Schema: public; Owner: tafia
--
DROP TABLE IF EXISTS process_actions CASCADE;

CREATE TABLE process_actions (
	pac_id serial PRIMARY KEY,
	pac_business_area character varying(100),
	pac_project integer,
	pac_item character varying(100),
	pac_reference character varying(100),
	pac_audit_results character varying(500),
	pac_immediate_action character varying(500),
	pac_causes character varying(500),
	pac_corrective_actions character varying(500),
	pac_due_date date,
	pac_responsible character varying(100),
	pac_due_implementation_date date,
	pac_verification_date date,
	pac_status character varying(100),
	pac_qms_comments character varying(500),
	pac_user_id integer,
	pac_create_date TIMESTAMP
);

ALTER TABLE process_actions OWNER TO tafia;

--
-- Name: v_get_process_actions; Type: VIEW; Schema: public; Owner: tafia
--

DROP VIEW IF EXISTS v_get_process_actions;

CREATE VIEW v_get_process_actions AS
   SELECT 
    pac_id,
	pac_business_area,
	pac_project,
	pac_item,
	pac_reference,
	pac_audit_results,
	pac_immediate_action,
	pac_causes,
	pac_corrective_actions,
	to_char(pac_due_date,'YYYY-MM-DD') AS pac_due_date,
	pac_responsible,
	to_char(pac_due_implementation_date,'YYYY-MM-DD') AS pac_due_implementation_date,
	to_char(pac_verification_date,'YYYY-MM-DD') AS pac_verification_date,
	pac_status,
	pac_qms_comments,
	pac_user_id,
	pac_create_date
   FROM process_actions pac;
   
 ALTER VIEW v_get_process_actions OWNER TO tafia;
 
 -- SELECT * FROM v_get_process_actions;
 
 
DROP TABLE IF EXISTS system_actions CASCADE;

CREATE TABLE system_actions (
	sac_id serial PRIMARY KEY,
	sac_identificator character varying(100),
	sac_class character varying(100),
	sac_process character varying(100),
    sac_area character varying(100),
	sac_non_conformity_description character varying(500),
    sac_iatf_clause character varying(100),
	sac_root_cause_due_date date,
	sac_corrective_action_date date,
	sac_action_description character varying(500),
	sac_action_type character varying(100),
	sac_responsible character varying(100),
	sac_due_date date,
	sac_status character varying(100),
	sac_qms_comments character varying(500),
	sac_user_id integer,
	sac_create_date TIMESTAMP
);

ALTER TABLE system_actions OWNER TO tafia;

DROP VIEW IF EXISTS v_get_system_actions;

CREATE VIEW v_get_system_actions AS
   SELECT 
    sac.sac_id,
	sac.sac_identificator,
	sac.sac_class,
    sac.sac_area,
	sac.sac_non_conformity_description,
    sac.sac_iatf_clause,
	to_char(sac.sac_root_cause_due_date,'YYYY-MM-DD') AS sac_root_cause_due_date,
	to_char(sac.sac_corrective_action_date,'YYYY-MM-DD') AS sac_corrective_action_date,
	sac.sac_action_description,
	sac.sac_action_type,
	sac.sac_responsible,
	to_char(sac.sac_due_date,'YYYY-MM-DD') AS sac_due_date,
	sac.sac_status,
	sac.sac_qms_comments,
	sac.sac_user_id,
	sac.sac_create_date
   FROM system_actions sac;

   
ALTER VIEW v_get_system_actions OWNER TO tafia;
 
 -- SELECT * FROM v_get_system_actions;