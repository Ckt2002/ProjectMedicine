package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Brand;

import java.util.List;

public interface BrandService {

    List<Brand> getAllBrands();

    Brand getBrandById(Long id);

    Brand getBrandByName(String name);

    Brand addBrand(Brand brand);

    Brand updateBrand(Brand brand);

    void deleteBrand(Long id);
}
