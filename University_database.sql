create database university_data;
use university_data;


create table colleges (
  id bigint primary key AUTO_INCREMENT,
  name varchar(50) not null, 
  location varchar(50) 
);

create table students (
  id bigint primary key AUTO_INCREMENT,
  first_name varchar(50) not null,  
  last_name varchar(50) not null,   
  email varchar(50) unique not null,  
  enrollment_year int not null,
  college_id bigint references colleges (id)
);

create table courses (
  id bigint primary key AUTO_INCREMENT,
  name varchar(50) not null,  
  code varchar(50) unique not null,  
  credits int not null,
  college_id bigint references colleges (id)
);

create table registrations (
  id bigint primary key AUTO_INCREMENT,
  student_id bigint references students (id),
  course_id bigint references courses (id),
  registration_date date not null
);

create table grades (
  id bigint primary key AUTO_INCREMENT,
  registration_id bigint references registrations (id),
  grade varchar(2) check (grade in ('A', 'B', 'C', 'D', 'F', 'I', 'W'))  
);

create table schedules (
  id bigint primary key AUTO_INCREMENT,
  course_id bigint references courses (id),
  day_of_week varchar(10) check (
    day_of_week in (
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    )
  ),
  start_time time not null,
  end_time time not null
);
