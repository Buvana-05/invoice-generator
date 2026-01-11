package com.example.invoice_generator.service;

import java.time.Year;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.invoice_generator.model.InvoiceSequence;
import com.example.invoice_generator.repository.InvoiceSequenceRepository;

@Service
public class InvoiceNumberService {
	private final InvoiceSequenceRepository repository;

	public InvoiceNumberService(InvoiceSequenceRepository repository) {
		this.repository = repository;
	}

	@Transactional
	public String generateInvoiceNumber() {

		String year = String.valueOf(Year.now().getValue());

		InvoiceSequence sequence = repository.findById(year).orElseGet(() -> {
			InvoiceSequence s = new InvoiceSequence();
			s.setYear(year);
			s.setSeq(0);
			return s;
		});

		long next = sequence.getSeq() + 1;
		sequence.setSeq(next);
		repository.save(sequence);

		return String.format("INV-%s%03d", year, next);
	}
}
