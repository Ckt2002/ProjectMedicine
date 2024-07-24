package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Brand;
import com.medicine.medicine.Repository.BrandRepository;
import com.medicine.medicine.Service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {
    
    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand getBrandById(Long id) {
        return brandRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Brand not found"));
    }

    @Override
    public Brand getBrandByName(String name) {
        return brandRepository.findByName(name).orElseThrow(() -> new IllegalArgumentException("Brand not found"));
    }

    @Override
    public Brand addBrand(Brand Brand) {
        if (brandRepository.findByName(Brand.getName()).isPresent()) {
            throw new IllegalArgumentException("Brand name already exists");
        }
        return brandRepository.save(Brand);
    }

    @Override
    public Brand updateBrand(Brand Brand) {
        validateBrandExists(Brand.getId());
        if (brandRepository.findByName(Brand.getName()).isPresent()) {
            throw new IllegalArgumentException("Brand name already exists");
        }
        return brandRepository.save(Brand);
    }

    @Override
    public void deleteBrand(Long id) {
        validateBrandExists(id);
        brandRepository.deleteById(id);
    }

    private void validateBrandExists(Long id) {
        if (!brandRepository.existsById(id)) {
            throw new IllegalArgumentException("Brand not found");
        }
    }
}
