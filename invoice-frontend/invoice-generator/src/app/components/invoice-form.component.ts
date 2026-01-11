import { ChangeDetectorRef, Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvoiceRequest, InvoiceItemRequest } from '../models/invoice-request.model';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent {

  invoice: InvoiceRequest = {
    companyDetails: {
      name: '',
      address: '',
      email: '',
      phone: ''
    },
    customerDetails: {
      name: '',
      companyName: '',
      address: '',
      email: ''
    },
    items: []
  };
  
  isEditMode = false;
  createdInvoiceId: string | null = null;
  invoiceNumber: string | null = null;
  searchInvoiceNumber = '';
  
  searchCompleted = false;
  foundInvoice: any = null;
  constructor(private invoiceService: InvoiceService, private cdr: ChangeDetectorRef) {}
  
  addItem() {
    this.invoice.items.push({
      description: '',
      quantity: null,
      rate: null,
      taxPercentage: null
    } as InvoiceItemRequest);
  }

  removeItem(index: number) {
    this.invoice.items.splice(index, 1);
  }

  getSubtotal(): number {
    return this.invoice.items.reduce(
      (sum, item) => sum + (item.quantity ?? 0) * (item.rate ?? 0),
      0
    );
  }

  getTax(): number {
    return this.invoice.items.reduce(
      (sum, item) => sum + ((item.quantity ?? 0) * (item.rate ?? 0) * (item.taxPercentage ?? 0)) / 100,
      0
    );
  }

  getGrandTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  createInvoice() {
    console.log('Invoice payload:', this.invoice);
    this.invoiceService.createInvoice(this.invoice).subscribe(
      res => {
        this.createdInvoiceId = res.invoiceId; // Save ID for PDF
        alert('Invoice created successfully!');
      },
      err => {
        console.error('Error creating invoice', err);
        alert('Failed to create invoice.');
      }
    );
  }
  
  updateInvoice() {
    if (!this.createdInvoiceId) {
      alert('No invoice selected for update.');
      return;
    }
  
    this.invoiceService.updateInvoice(this.createdInvoiceId, this.invoice).subscribe({
      next: (res) => {
        alert('Invoice updated successfully!');
        this.resetForm();
        this.isEditMode = false;
        this.createdInvoiceId = res.invoiceId;
      },
      error: (err) => {
        console.error('Error updating invoice', err);
        alert('Failed to update invoice.');
      }
    });
  }
  
  deleteInvoice() {
    if (!this.createdInvoiceId) {
      alert('No invoice selected for deletion.');
      return;
    }
  
    if (!confirm('Are you sure you want to delete this invoice?')) return;
  
    this.invoiceService.deleteInvoice(this.createdInvoiceId).subscribe({
      next: () => {
        alert('Invoice deleted successfully!');
        this.resetForm();
        this.resetSearch();
      },
      error: (err) => {
        console.error('Error deleting invoice', err);
        alert('Failed to delete invoice.');
      }
    });
  }
  
  resetForm() {
    this.invoice = {
      companyDetails: { name: '', address: '', email: '', phone: '' },
      customerDetails: { name: '', companyName: '', address: '', email: '' },
      items: []
    };
    this.isEditMode = false;
    this.createdInvoiceId = null;
  }

  viewPdf() {
    if (!this.createdInvoiceId) return;
  
    this.invoiceService.getInvoicePdf(this.createdInvoiceId).subscribe({
      next: pdf => {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); 
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      },
      error: err => {
        console.error('Error fetching PDF', err);
        alert('Failed to fetch PDF');
      }
    });
  }
  
  downloadPdf() {
    if (!this.createdInvoiceId) {
      alert('Please create invoice first');
      return;
    }
  
    this.invoiceService.downloadInvoicePdf(this.createdInvoiceId).subscribe({
      next: (pdfBlob: Blob) => {
        const file = new Blob([pdfBlob], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
  
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'invoice.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // Revoke URL to free memory
        setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
      },
      error: (err) => {
        console.error('Error downloading PDF', err);
        alert('Failed to download PDF');
      }
    });
  }

  searchInvoice() {
    const value = this.searchInvoiceNumber?.trim().toUpperCase();
    if (!value) {
      this.foundInvoice = null;
      this.searchCompleted = true;
      return;
    }
  
    this.searchCompleted = false;
  
    this.invoiceService.searchInvoiceByNumber(value).subscribe({
      next: (invoice) => {
        this.foundInvoice = invoice;
        this.createdInvoiceId = invoice?.id || null;
        this.invoiceNumber = invoice?.invoiceNumber || null;
        this.searchCompleted = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.foundInvoice = null;
        this.searchCompleted = true;
      }
    });
  }
  
  resetSearch() {
    this.searchInvoiceNumber = '';
    this.foundInvoice = null;
    this.searchCompleted = false;
  }
  
  enableEdit() {
    if (!this.foundInvoice) return;
  
    this.invoice = {
      companyDetails: { ...this.foundInvoice.companyDetails },
      customerDetails: { ...this.foundInvoice.customerDetails },
      items: this.foundInvoice.items.map((i: any) => ({ ...i }))
    };
  
    this.isEditMode = true;
  }
}
