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



