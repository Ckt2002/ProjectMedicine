package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Contraindicated;

import java.util.List;

public interface ContraindicatedService {
    List<Contraindicated> getAllContraindications();
    Contraindicated getContraindicationById(Long id);
    Contraindicated createContraindication(Contraindicated contraindication);
    Contraindicated updateContraindication(Contraindicated contraindicationDetails);
    void deleteContraindication(Long id);
}
