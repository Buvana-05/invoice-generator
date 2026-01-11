package com.example.invoice_generator.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.invoice_generator.model.InvoiceSequence;

public interface InvoiceSequenceRepository extends MongoRepository<InvoiceSequence, String>{

}
