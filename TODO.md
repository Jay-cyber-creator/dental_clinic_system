# Dental Clinic Management System TODO - Build Phase

## Step 1: Run clinic.sql to set up database
- [x] Execute clinic.sql to create database and tables

## Step 2: Implement authentication - Create user model
- [ ] Create backend/src/models/user.ts with User interface and database functions

## Step 3: Implement auth routes (/register, /login)
- [ ] Create backend/src/routes/auth.ts with register and login endpoints
- [ ] Add bcrypt for password hashing and jsonwebtoken for JWT

## Step 4: Create JWT middleware
- [ ] Create backend/src/middleware/auth.ts for JWT verification and role checking

## Step 5: Create models for clinics, patients, appointments
- [ ] Create backend/src/models/clinic.ts
- [ ] Create backend/src/models/patient.ts
- [ ] Create backend/src/models/appointment.ts

## Step 6: Build API routes for clinics (CRUD)
- [ ] Create backend/src/routes/clinics.ts with GET, POST, PUT, DELETE endpoints
- [ ] Integrate with clinic model

## Step 7: Build API routes for users (CRUD)
- [ ] Create backend/src/routes/users.ts with GET, POST, PUT, DELETE endpoints
- [ ] Integrate with user model

## Step 8: Build API routes for patients (CRUD)
- [ ] Create backend/src/routes/patients.ts with GET, POST, PUT, DELETE endpoints
- [ ] Integrate with patient model

## Step 9: Build API routes for appointments (CRUD)
- [ ] Create backend/src/routes/appointments.ts with GET, POST, PUT, DELETE endpoints
- [ ] Integrate with appointment model

## Step 10: Add role-based access control (RBAC) middleware
- [ ] Update middleware/auth.ts to include role-based permissions
- [ ] Apply RBAC to all routes

## Step 11: Implement error handling and validation
- [ ] Add global error handler in index.ts
- [ ] Add input validation using a library like joi or express-validator

## Step 12: Test API endpoints
- [ ] Test all endpoints using Postman or curl
- [ ] Ensure database connections and auth work
