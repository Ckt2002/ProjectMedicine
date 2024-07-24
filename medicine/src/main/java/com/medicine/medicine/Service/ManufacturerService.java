package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Manufacturer;

import java.util.List;

public interface ManufacturerService {
    List<Manufacturer> getAllManufacturers();

    Manufacturer getManufacturerById(Long id);

    Manufacturer getManufacturerByName(String name);

    Manufacturer addManufacturer(Manufacturer manufacturer);

    Manufacturer updateManufacturer(Manufacturer manufacturer);
    
    void deleteManufacturer(Long id);
}
