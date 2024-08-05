package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Contraindicated;
import com.medicine.medicine.Repository.ContraindicatedRepository;
import com.medicine.medicine.Service.ContraindicatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContraindicatedServiceImpl implements ContraindicatedService {

    @Autowired
    private ContraindicatedRepository contraindicatedRepository;

    @Override
    public List<Contraindicated> getAllContraindications() {
        return contraindicatedRepository.findAll();
    }

    @Override
    public Contraindicated getContraindicationById(Long id) {
        return contraindicatedRepository.findById(id).orElse(null);
    }

    @Override
    public Contraindicated createContraindication(Contraindicated contraindication) {
        if (contraindicatedRepository.findByName(contraindication.getName()).isPresent()) {
            throw new IllegalArgumentException("Contraindicated with name " + contraindication.getName() + " already exists.");
        }
        return contraindicatedRepository.save(contraindication);
    }

    @Override
    public Contraindicated updateContraindication(Contraindicated contraindicationDetails) {
        Contraindicated contraindication = contraindicatedRepository.findById(contraindicationDetails.getId())
                .orElseThrow(() -> new IllegalArgumentException("Contraindicated not found with id: " +
                        contraindicationDetails.getId()));

        if (!contraindication.getName().equals(contraindicationDetails.getName()) &&
                contraindicatedRepository.findByName(contraindicationDetails.getName()).isPresent()) {
            throw new IllegalArgumentException("Contraindicated with name " + contraindicationDetails.getName() + " already exists.");
        }

        contraindication.setName(contraindicationDetails.getName());
        return contraindicatedRepository.save(contraindication);
    }

    @Override
    public void deleteContraindication(Long id) {
        Contraindicated contraindication = contraindicatedRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contraindicated not found with id: " + id));
        contraindicatedRepository.delete(contraindication);
    }
}