package com.example.invoice_generator.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.invoice_generator.dto.InvoiceRequest;
import com.example.invoice_generator.model.CompanyDetails;
import com.example.invoice_generator.model.CustomerDetails;
import com.example.invoice_generator.model.Invoice;
import com.example.invoice_generator.model.InvoiceItem;
import com.example.invoice_generator.repository.InvoiceRepository;

@Service
public class InvoiceService {
	private final InvoiceRepository invoiceRepository;
	private final InvoiceNumberService invoiceNumberService;

	public InvoiceService(InvoiceRepository invoiceRepository, InvoiceNumberService invoiceNumberService) {
		this.invoiceRepository = invoiceRepository;
		this.invoiceNumberService = invoiceNumberService;
	}

	// ================= CREATE =================

	public Invoice createInvoice(InvoiceRequest request) {
		Invoice invoice = new Invoice();
		invoice.setInvoiceNumber(invoiceNumberService.generateInvoiceNumber());
		invoice.setInvoiceDate(LocalDate.now());
		invoice.setCreatedAt(LocalDateTime.now());
		invoice.setInvoiceNumber(invoice.getInvoiceNumber().trim().toUpperCase());
		mapRequestToInvoice(invoice, request);

		return invoiceRepository.save(invoice);
	}

	// ================= READ =================

	public Invoice getInvoiceById(String id) {
		return invoiceRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));
	}

	public List<Invoice> getAllInvoices() {
		return invoiceRepository.findAll();
	}

	public Invoice getInvoiceByInvoiceNumber(String invoiceNumber) {
	    return invoiceRepository.findByInvoiceNumber(invoiceNumber)
	            .orElseThrow(() ->
	                new RuntimeException("Invoice not found: " + invoiceNumber)
	            );
	}
	
	// ================= UPDATE =================

	public Invoice updateInvoice(String id, InvoiceRequest request) {

		Invoice existingInvoice = invoiceRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));

		// Do NOT change invoice number or creation date
		mapRequestToInvoice(existingInvoice, request);

		return invoiceRepository.save(existingInvoice);
	}

	// ================= DELETE =================

	public void deleteInvoice(String id) {

		Invoice invoice = invoiceRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));

		invoiceRepository.delete(invoice);
	}

	// ================= COMMON MAPPING + CALCULATION =================

	private void mapRequestToInvoice(Invoice invoice, InvoiceRequest request) {

		// ---- Company ----
		if (request.getCompanyDetails() != null) {
			invoice.setCompanyDetails(request.getCompanyDetails());
		} else if (invoice.getCompanyDetails() == null) {
			invoice.setCompanyDetails(new CompanyDetails());
		}

		// ---- Customer ----
		if (request.getCustomerDetails() != null) {
			invoice.setCustomerDetails(request.getCustomerDetails());
		} else if (invoice.getCustomerDetails() == null) {
			invoice.setCustomerDetails(new CustomerDetails());
		}

		// ---- Items ----
		List<InvoiceItem> items = request.getItems();
		if (items == null || items.isEmpty()) {
			invoice.setItems(List.of());
			invoice.setSubTotal(BigDecimal.ZERO);
			invoice.setTaxAmount(BigDecimal.ZERO);
			invoice.setGrandTotal(BigDecimal.ZERO);
			return;
		}

		BigDecimal subTotal = BigDecimal.ZERO;
		BigDecimal taxTotal = BigDecimal.ZERO;

		for (InvoiceItem item : items) {

			if (item.getQuantity() == null)
				item.setQuantity(0);
			if (item.getRate() == null)
				item.setRate(BigDecimal.ZERO);
			if (item.getTaxPercentage() == null)
				item.setTaxPercentage(BigDecimal.ZERO);

			BigDecimal qty = BigDecimal.valueOf(item.getQuantity());
			BigDecimal lineAmount = item.getRate().multiply(qty);

			BigDecimal taxAmount = lineAmount.multiply(item.getTaxPercentage()).divide(BigDecimal.valueOf(100), 2,
					BigDecimal.ROUND_HALF_UP);

			BigDecimal lineTotal = lineAmount.add(taxAmount);

			item.setLineTotal(lineTotal);

			subTotal = subTotal.add(lineAmount);
			taxTotal = taxTotal.add(taxAmount);
		}

		invoice.setItems(items);
		invoice.setSubTotal(subTotal);
		invoice.setTaxAmount(taxTotal);
		invoice.setGrandTotal(subTotal.add(taxTotal));
	}

	// ================= UTIL =================

	private String generateInvoiceNumber() {
		return "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
	}
}