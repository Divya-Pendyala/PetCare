# PetCare - Pet Care Management System

PetCare is a full-stack web application for managing pet profiles and day-to-day pet care information.

## Features

* User registration and email/password login
* Google OAuth2 login
* JWT-protected REST APIs and protected React routes
* Pet profile CRUD
* Vaccination CRUD and next-due tracking
* Veterinary appointment CRUD and status
* Health record CRUD
* Reminder CRUD and completion state
* User profile management
* Dashboard summaries
* Light/dark theme and responsive UI

## Technology Stack

**Frontend:** React 19, Vite 8, React Router, Axios, CSS  
**Backend:** Java 21, Spring Boot 3.5.7, Spring Security, Spring Data JPA, Jakarta Validation  
**Authentication:** JWT (JJWT 0.12.6), Google OAuth2, BCrypt  
**Database:** MySQL  
**Tools:** Eclipse, Postman, Git/GitHub

## Project Structure

```text
JavaMainProject/
├── Petcare/                 # Spring Boot backend
└── petcare-frontend/        # React/Vite frontend
```

## Required Environment Variables

Set these before starting the backend:

```text
DB\\\_PASSWORD=<mysql root/user password>
JWT\\\_SECRET=<strong secret at least 32 bytes for HS256>
GOOGLE\\\_CLIENT\\\_ID=<google oauth client id>
GOOGLE\\\_CLIENT\\\_SECRET=<google oauth client secret>
```



## Database

The development configuration uses:

```text
jdbc:mysql://localhost:3306/petcareDB
```

Create the database if it does not already exist:

```sql
CREATE DATABASE petcareDB;
```

Hibernate is configured with `spring.jpa.hibernate.ddl-auto=update`.

## Run the Backend

From `Petcare/`, run the Spring Boot application from Eclipse or with Maven if Maven is available.

Backend development URL:

```text
http://localhost:8081
```

## Run the Frontend

From `petcare-frontend/`:

```bash
npm install
npm run dev
```

Frontend development URL:

```text
http://localhost:5173
```

## Main API Groups

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET|PUT /api/profile`
* `/api/pets`
* `/api/pets/{petId}/vaccinations`
* `/api/pets/{petId}/appointments`
* `/api/pets/{petId}/health-records`
* `/api/pets/{petId}/reminders`

Protected requests use:

```text
Authorization: Bearer <JWT>
```

## Google OAuth2

The backend uses Spring Security OAuth2 Client. In local development, Google login returns to the backend and then redirects to the React OAuth transition page.

## Final Deliverables

* PowerPoint Presentation
* High-Level Design (HLD)
* Low-Level Design (LLD)
* Git repository with complete source
* Code Review \& Verification Report

## Repository

https://github.com/Divya-Pendyala/PetCare



