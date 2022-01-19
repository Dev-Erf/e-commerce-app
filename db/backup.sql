--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 14.1

-- Started on 2022-01-19 20:07:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16727)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3088 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16576)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    country character varying(20),
    province character varying(20),
    city character varying(20),
    avenue character varying(20),
    postal_code integer,
    id integer NOT NULL
);


ALTER TABLE public.address OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16631)
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO postgres;

--
-- TOC entry 3089 (class 0 OID 0)
-- Dependencies: 206
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- TOC entry 211 (class 1259 OID 16709)
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    cart_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.cart_item OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16611)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    date timestamp without time zone NOT NULL,
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16659)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 3090 (class 0 OID 0)
-- Dependencies: 209
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 204 (class 1259 OID 16591)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    cart_id integer NOT NULL,
    date_added timestamp without time zone,
    id integer NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16652)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3091 (class 0 OID 0)
-- Dependencies: 208
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 203 (class 1259 OID 16581)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    name character varying(20),
    quantity integer,
    manufactorer character varying(20),
    id integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16645)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3092 (class 0 OID 0)
-- Dependencies: 207
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 201 (class 1259 OID 16571)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    first_name character varying(20),
    last_name character varying(20),
    registeration_date timestamp without time zone,
    email character varying(50) NOT NULL,
    type character varying(20),
    address_id integer,
    id integer NOT NULL,
    pass text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16666)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3093 (class 0 OID 0)
-- Dependencies: 210
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2917 (class 2604 OID 16633)
-- Name: address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- TOC entry 2920 (class 2604 OID 16661)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 2919 (class 2604 OID 16654)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 2918 (class 2604 OID 16647)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 2916 (class 2604 OID 16668)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3073 (class 0 OID 16576)
-- Dependencies: 202
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (country, province, city, avenue, postal_code, id) FROM stdin;
iran	fars	shiraz	farhangshahr	123456789	1
ca	NL	st johns	pinebud	426464	2
current_timestamp	true	\N	\N	\N	3
\.


--
-- TOC entry 3082 (class 0 OID 16709)
-- Dependencies: 211
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_item (cart_id, product_id) FROM stdin;
1	2
1	1
2	1
2	2
\.


--
-- TOC entry 3076 (class 0 OID 16611)
-- Dependencies: 205
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (date, id, user_id) FROM stdin;
2021-12-24 17:35:20.101909	3	\N
2021-12-24 17:35:29.943972	4	\N
2021-12-24 17:35:38.311168	5	\N
2021-12-24 10:42:54.808	6	\N
2021-12-24 10:52:43.507	9	\N
2021-12-24 10:43:32.421	8	\N
2021-12-24 17:35:03.750466	1	29
2021-12-24 17:35:14.804893	2	30
\.


--
-- TOC entry 3075 (class 0 OID 16591)
-- Dependencies: 204
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (cart_id, date_added, id) FROM stdin;
1	2021-12-31 17:55:41.911	1
1	2021-12-31 17:57:57.376	2
1	2021-12-31 17:59:59.71	3
1	2021-12-31 18:09:36.118	4
1	2021-12-31 18:11:20.899	5
\.


--
-- TOC entry 3074 (class 0 OID 16581)
-- Dependencies: 203
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (name, quantity, manufactorer, id) FROM stdin;
laptop	4	lenovo	1
phone	6	apple	2
phone	6	apple	3
\.


--
-- TOC entry 3072 (class 0 OID 16571)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (first_name, last_name, registeration_date, email, type, address_id, id, pass) FROM stdin;
erfan	\N	\N	gmail	\N	\N	29	$2a$06$dWOYosJEmCIJdewewn5J3OYL5g.WFEih..gV2hC1EM2Do3jLl1TIK
\N	\N	\N	reza	\N	\N	30	$2a$06$E7XBj.axhCHB/gN78v3s8u8x4z.7dZmGqqdOD9ot59GpQpMlfx9Si
\N	\N	\N	ali	\N	\N	31	$2a$06$UYaNC0CQS6PJWcP5Sdwo7u2MU2lNv/GXXkeKxOCNEZnNg.S6h0MTq
\N	\N	\N	aaali	\N	\N	33	$2a$06$22C5cjWP6fXDvjdMUczwSeHWqEwXlXR/0WWk8lSHcTWubHmVRu7QC
\.


--
-- TOC entry 3094 (class 0 OID 0)
-- Dependencies: 206
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 3, true);


--
-- TOC entry 3095 (class 0 OID 0)
-- Dependencies: 209
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 11, true);


--
-- TOC entry 3096 (class 0 OID 0)
-- Dependencies: 208
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 5, true);


--
-- TOC entry 3097 (class 0 OID 0)
-- Dependencies: 207
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- TOC entry 3098 (class 0 OID 0)
-- Dependencies: 210
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 34, true);


--
-- TOC entry 2929 (class 2606 OID 16678)
-- Name: address address_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pk PRIMARY KEY (id);


--
-- TOC entry 2937 (class 2606 OID 16713)
-- Name: cart_item cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (cart_id, product_id);


--
-- TOC entry 2935 (class 2606 OID 16680)
-- Name: carts carts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pk PRIMARY KEY (id);


--
-- TOC entry 2933 (class 2606 OID 16686)
-- Name: orders orders_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id PRIMARY KEY (id);


--
-- TOC entry 2931 (class 2606 OID 16682)
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 16575)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2925 (class 2606 OID 16676)
-- Name: users users_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (id);


--
-- TOC entry 2927 (class 2606 OID 16684)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- TOC entry 2921 (class 1259 OID 16621)
-- Name: user_first_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_first_name_idx ON public.users USING btree (first_name);


--
-- TOC entry 2940 (class 2606 OID 16714)
-- Name: cart_item cart_item_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- TOC entry 2941 (class 2606 OID 16719)
-- Name: cart_item cart_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 2939 (class 2606 OID 16704)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2938 (class 2606 OID 16687)
-- Name: orders orders_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);


-- Completed on 2022-01-19 20:07:24

--
-- PostgreSQL database dump complete
--

