package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.DetailOrderSupplier;
import com.medicine.medicine.Entity.DetailOrderSupplierPK;

import java.util.List;

public interface DetailOrderSupplierService {
    List<DetailOrderSupplier> getAllDetailOrderSuppliers();

    DetailOrderSupplier getDetailOrderSupplierById(DetailOrderSupplierPK id);

    DetailOrderSupplier addDetailOrderSupplier(DetailOrderSupplier detailOrderSupplier);

    DetailOrderSupplier updateDetailOrderSupplier(DetailOrderSupplier detailOrderSupplier);

    void deleteDetailOrderSupplier(DetailOrderSupplierPK id);

    List<DetailOrderSupplier> getDetailsByOrderSupplierId(String orderSupplierId);
}
