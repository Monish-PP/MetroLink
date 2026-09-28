package PROJ.CABLESENSE.accounting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.UUID;
import java.util.List;

@Service
public class AccountingService {

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Transactional
    public void postCustomerInvoice(Double amount, String reference, String description) {
        postDoubleEntry(amount, "Accounts Receivable", "Municipal Transit Revenue", "Sales", reference, description);
    }

    @Transactional
    public void postCustomerPayment(Double amount, String reference, String description) {
        postDoubleEntry(amount, "Bank", "Accounts Receivable", "Cash", reference, description);
    }

    @Transactional
    public void postVendorBill(Double amount, String expenseAccount, String reference, String description) {
        postDoubleEntry(amount, expenseAccount, "Accounts Payable", "Purchase", reference, description);
    }

    @Transactional
    public void postVendorPayment(Double amount, String reference, String description) {
        postDoubleEntry(amount, "Accounts Payable", "Bank", "Cash", reference, description);
    }

    private void postDoubleEntry(Double amount, String debitAccount, String creditAccount, String journalType, String reference, String description) {
        if (amount == null || amount < 0) {
            throw new IllegalArgumentException("Amount must be greater than or equal to 0");
        }

        JournalEntry entry = new JournalEntry();
        entry.setJournalNumber("JRN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        entry.setJournalType(journalType);
        entry.setTransactionDate(LocalDate.now());
        entry.setReference(reference);
        entry.setDescription(description);
        entry.setStatus("POSTED");

        JournalLine debitLine = new JournalLine();
        debitLine.setJournalEntry(entry);
        debitLine.setAccount(debitAccount);
        debitLine.setDebit(amount);
        debitLine.setCredit(0.0);
        debitLine.setDescription(description);

        JournalLine creditLine = new JournalLine();
        creditLine.setJournalEntry(entry);
        creditLine.setAccount(creditAccount);
        creditLine.setDebit(0.0);
        creditLine.setCredit(amount);
        creditLine.setDescription(description);

        entry.setLines(List.of(debitLine, creditLine));
        
        // Validation: totalDebit == totalCredit
        double totalDebit = entry.getLines().stream().mapToDouble(JournalLine::getDebit).sum();
        double totalCredit = entry.getLines().stream().mapToDouble(JournalLine::getCredit).sum();
        
        if (Math.abs(totalDebit - totalCredit) > 0.001) {
            throw new IllegalStateException("Journal is unbalanced: Debit=" + totalDebit + " Credit=" + totalCredit);
        }

        journalEntryRepository.save(entry);
    }
}
