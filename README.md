# Invoice Generator Application

A robust, full-stack Invoice Generator featuring a **Spring Boot** backend and **Angular** frontend.

## Features
- Create invoices with company details, customer details, and line items
- Auto-generated invoice numbers
- View invoice details in a read-only panel
- Search invoices by invoice number
- Edit existing invoices without creating duplicate IDs
- Delete invoices safely
- Generate and download invoice PDFs
- Clean UI separation between form (left panel) and results (right panel)
- RESTful backend with proper HTTP methods
- CORS-enabled backend for frontend integration

---

## API Endpoints

| Method | Endpoint | Description | 
|----------|-------------|-----------------|
| `POST` | /api/invoices | Create a new invoice | 
| `GET` | /api/invoices/{id} | Get invoice by ID | 
| `GET` | /api/invoices/search/{invoiceNumber} | Search invoice by number |
| `PUT` | /api/invoices/{id} | Update an existing invoice | 
| `DELETE`| /api/invoices/{id} | Delete an invoice | 
| `GET` | /api/invoices/{id}/pdf | Generate and download invoice PDF | 

---

## Getting Started (Local Development)

### 1. Database Setup
Ensure you have MongoDB running locally with a database named `invoice-generator`.

### 2. Backend (Spring Boot)
Navigate to the `invoice-generator-backend` directory:
```bash
cd invoice-generator-backend
./mvnw spring-boot:run
```
The API will start at `http://localhost:8080`.

### 3. Frontend (Angular)
Navigate to the `invoice-generator-frontend` directory:
```bash
cd invoice-generator-frontend
npm install
ng serve
```
Open current browser at `http://localhost:4200`.

---
