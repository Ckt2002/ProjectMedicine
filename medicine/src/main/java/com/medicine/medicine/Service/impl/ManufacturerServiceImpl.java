package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Manufacturer;
import com.medicine.medicine.Repository.ManufacturerRepository;
import com.medicine.medicine.Service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @Override
    public List<Manufacturer> getAllManufacturers() {
        return manufacturerRepository.findAll();
    }

    @Override
    public Manufacturer getManufacturerById(Long id) {
        return manufacturerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Manufacturer not found"));
    }

    @Override
    public Manufacturer getManufacturerByName(String name) {
        return manufacturerRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("Manufacturer not found"));
    }

    @Override
    public Manufacturer addManufacturer(Manufacturer manufacturer) {
        if (manufacturerRepository.findByName(manufacturer.getName()).isPresent()) {
            throw new IllegalArgumentException("Manufacturer name already exists");
        }
        return manufacturerRepository.save(manufacturer);
    }

    @Override
    public Manufacturer updateManufacturer(Manufacturer manufacturer) {
        validateManufacturerExists(manufacturer.getId());
        if (manufacturerRepository.findByName(manufacturer.getName()).isPresent()) {
            throw new IllegalArgumentException("Manufacturer name already exists");
        }
        return manufacturerRepository.save(manufacturer);
    }

    @Override
    public void deleteManufacturer(Long id) {
        validateManufacturerExists(id);
        manufacturerRepository.deleteById(id);
    }

    private void validateManufacturerExists(Long id) {
        if (!manufacturerRepository.existsById(id)) {
            throw new IllegalArgumentException("Manufacturer not found");
        }
    }
}
