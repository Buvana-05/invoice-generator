export interface CompanyDetailsRequest {
    name: string;
    address: string;
    email: string;
    phone: string;
  }
  
  export interface CustomerDetailsRequest {
    name: string;
    companyName: string;
    address: string;
    email: string;
  }
  
  export interface InvoiceItemRequest {
    description: string;
    quantity: number | null;   // nullable until user enters a value
    rate: number | null;
    taxPercentage: number | null;
  }
  
  export interface InvoiceRequest {
    companyDetails: CompanyDetailsRequest;
    customerDetails: CustomerDetailsRequest;
    items: InvoiceItemRequest[];
    invoiceDate?: string;
  }