CREATE DATABASE sghss_sistema
    WITH
    OWNER = postgres
    TEMPLATE = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT ALL ON DATABASE sghss_sistema TO PUBLIC;