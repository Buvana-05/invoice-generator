// invoice.service.ts (Angular)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceRequest } from '../models/invoice-request.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) {}

  createInvoice(invoiceRequest: InvoiceRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}`, invoiceRequest);
  }

  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  
  updateInvoice(invoiceId: string, invoice: InvoiceRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${invoiceId}`, invoice);
  }

  // ---------------- DELETE ----------------
  deleteInvoice(invoiceId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${invoiceId}`);
  }

  searchInvoiceByNumber(invoiceNumber: string): Observable<any> {
    // Sends ?invoiceNumber=INV-2026006
    return this.http.get<any>(`${this.baseUrl}/search`, {
      params: { invoiceNumber: invoiceNumber.trim() }
    });
  }
  
  getInvoicePdf(invoiceId: string): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/${invoiceId}/pdf`,
      { responseType: 'blob' }
    );
  }
  downloadInvoicePdf(invoiceId: string): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/${invoiceId}/pdf`,
      { responseType: 'blob' }
    );
  }
  
  createAndGetPdf(invoiceRequest: InvoiceRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/pdf`, invoiceRequest, { responseType: 'blob' });
  }
}
