Invoice Generator Application

A full-stack Invoice Generator application built with Angular and Spring Boot.


Features

Create invoices with company details, customer details, and line items
Auto-generated invoice number
View invoice details in a read-only panel
Search invoices by invoice number
Edit existing invoices without creating duplicate IDs
Delete invoices safely
Generate and download invoice PDFs
Clean UI separation between form (left panel) and results (right panel)
RESTful backend with proper HTTP methods
CORS-enabled backend for frontend integration


Frontend Overview

UI Layout

Left Panel
Invoice creation form
Used for both create and update
Update button appears only after clicking “Edit”

Right Panel
Search invoice by invoice number
Displays invoice details
Buttons: Edit, Delete, View PDF, Download PDF

State Handling
invoice → bound to the form only
foundInvoice → used only for display
Prevents accidental form pollution and timing issues

Backend Overview
REST API Endpoints
Method	Endpoint	Description
POST	/api/invoices	Create a new invoice
GET	/api/invoices/{id}	Get invoice by ID
GET	/api/invoices/search/{invoiceNumber}	Search invoice by number
PUT	/api/invoices/{id}	Update an existing invoice
DELETE	/api/invoices/{id}	Delete an invoice
GET	/api/invoices/{id}/pdf	Generate and download 


Backend Setup

Open backend project in IDE

Configure application.properties if needed

Run:

mvn spring-boot:run


Backend runs on:

http://localhost:8080


Frontend Setup

Navigate to frontend folder

Install dependencies:

npm install


Run Angular app:

ng serve


Open browser:

http://localhost:4200
