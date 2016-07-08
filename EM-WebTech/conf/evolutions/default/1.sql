# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table partie (
  p_id                      bigint not null,
  stadion_s_id              bigint,
  host                      varchar(255),
  guest                     varchar(255),
  date                      varchar(255),
  constraint pk_partie primary key (p_id))
;

create table stadion (
  s_id                      bigint not null,
  name                      varchar(255),
  adresse                   varchar(255),
  seats                     integer,
  gates                     integer,
  sponsor                   varchar(255),
  constraint pk_stadion primary key (s_id))
;

create sequence partie_seq;

create sequence stadion_seq;

alter table partie add constraint fk_partie_stadion_1 foreign key (stadion_s_id) references stadion (s_id) on delete restrict on update restrict;
create index ix_partie_stadion_1 on partie (stadion_s_id);



# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists partie;

drop table if exists stadion;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists partie_seq;

drop sequence if exists stadion_seq;

