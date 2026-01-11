package com.example.invoice_generator.dto;

import java.util.List;

import com.example.invoice_generator.model.CompanyDetails;
import com.example.invoice_generator.model.CustomerDetails;
import com.example.invoice_generator.model.InvoiceItem;

public class InvoiceRequest {
	private CompanyDetails companyDetails;
	private CustomerDetails customerDetails;
	private List<InvoiceItem> items;

	public CompanyDetails getCompanyDetails() {
		return companyDetails;
	}

	public void setCompanyDetails(CompanyDetails companyDetails) {
		this.companyDetails = companyDetails;
	}

	public CustomerDetails getCustomerDetails() {
		return customerDetails;
	}

	public void setCustomerDetails(CustomerDetails customerDetails) {
		this.customerDetails = customerDetails;
	}

	public List<InvoiceItem> getItems() {
		return items;
	}

	public void setItems(List<InvoiceItem> items) {
		this.items = items;
	}
}
