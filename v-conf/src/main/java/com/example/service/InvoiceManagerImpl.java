package com.example.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.InvoiceRequestDTO;
import com.example.models.AlternateComponentMaster;
import com.example.models.Component;
import com.example.models.InvoiceDetail;
import com.example.models.InvoiceHeader;
import com.example.models.InvoiceStatus;
import com.example.models.Model;
import com.example.models.User;
import com.example.models.VehicleDefaultConfig;
import com.example.repository.AlternateComponentRepository;
import com.example.repository.DefaultConfigRepository;
import com.example.repository.InvoiceDetailRepository;
import com.example.repository.InvoiceHeaderRepository;
import com.example.repository.ModelRepository;
import com.example.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class InvoiceManagerImpl implements Invoicemanager {

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private AlternateComponentRepository alternateRepo;

    @Autowired
    private InvoiceHeaderRepository invoiceRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvoiceDetailRepository detailRepository;

    @Autowired
    private DefaultConfigRepository defaultConfigRepo;

    @Autowired
    private EmailService emailService;

    @Override
    @Transactional
    public void generateInvoice(InvoiceRequestDTO dto) {
        // TODO Auto-generated method stub
        // 1️⃣ Fetch user & model
        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

        Model model = modelRepository.findById(dto.getModelId())
                .orElseThrow(() -> new RuntimeException("Model not found"));

        // 2️⃣ Base amount (model price)
        double baseAmt = model.getPrice() * dto.getQty();

        // 3️⃣ Sum delta price (IMPORTANT)
        Double deltaSum = alternateRepo.sumDeltaPriceByModelId(dto.getModelId());

        if (deltaSum == null) {
            deltaSum = 0.0; // when no configuration
        }

        // 4️⃣ Final amount before tax
        double amount = baseAmt + deltaSum;

        // 5️⃣ Tax calculation (example: 18%)
        double tax = amount * 0.18;

        // 6️⃣ Total amount
        double totalAmt = amount + tax;

        // 7️⃣ Save invoice
        InvoiceHeader invoice = new InvoiceHeader();
        invoice.setUser(user);
        invoice.setModel(model);
        invoice.setQty(dto.getQty());
        invoice.setBaseAmt(baseAmt);
        invoice.setTax(tax);
        invoice.setTotalAmt(totalAmt);
        invoice.setInvDate(LocalDate.now());
        invoice.setStatus(InvoiceStatus.Confirmed);
        invoice.setCustomerDetail(dto.getCustomerDetail());

        InvoiceHeader invoiced = invoiceRepo.save(invoice);

        List<InvoiceDetail> invoiceDetails = new java.util.ArrayList<>();

        boolean isConfigure = alternateRepo.existsByModel_Id(model.getId());

        if (isConfigure) {
            List<AlternateComponentMaster> alternates = alternateRepo.findByModel_Id(model.getId());

            for (AlternateComponentMaster acm : alternates) {

                Component comp = acm.getAltComp();

                InvoiceDetail detail = new InvoiceDetail();
                detail.setInv(invoiced);
                detail.setComp(comp);
                detail.setCompPrice(comp.getPrice());

                detailRepository.save(detail);
                invoiceDetails.add(detail);
            }

        } else {
            List<VehicleDefaultConfig> defaults = defaultConfigRepo.findByModel_Id(model.getId());

            for (VehicleDefaultConfig dc : defaults) {

                Component comp = dc.getComp();

                InvoiceDetail detail = new InvoiceDetail();
                detail.setInv(invoiced);
                detail.setComp(comp);
                detail.setCompPrice(comp.getPrice());

                detailRepository.save(detail);
                invoiceDetails.add(detail);
            }

        }

        emailService.sendInvoiceEmail(user.getEmail(), invoiced, invoiceDetails);
    }

}