package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.DetailOrder;
import com.medicine.medicine.Entity.DetailOrderPK;

import java.util.List;

public interface DetailOrderService {
    List<DetailOrder> getAllDetailOrders();

    DetailOrder getDetailOrderById(DetailOrderPK id);

    DetailOrder addDetailOrder(DetailOrder detailOrder);

    DetailOrder updateDetailOrder(DetailOrder detailOrder);

    void deleteDetailOrder(DetailOrderPK id);

    List<DetailOrder> getDetailOrdersByIdOrder(String idOrder);

    long countDetailOrdersByMedicineId(String orderId, String medicineId);

    DetailOrder deleteOneDetailOrder(String orderId, String medicineId);

    void deleteDetailOrders(String orderId, String medicineId);
}
