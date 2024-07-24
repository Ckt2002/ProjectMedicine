package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.DetailOrder;
import com.medicine.medicine.Entity.DetailOrderPK;
import com.medicine.medicine.Repository.DetailOrderRepository;
import com.medicine.medicine.Service.DetailOrderService;
import com.medicine.medicine.Service.SeriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetailOrderServiceImpl implements DetailOrderService {

    @Autowired
    private DetailOrderRepository detailOrderRepository;

    @Autowired
    private SeriService seriService;

    @Override
    public List<DetailOrder> getAllDetailOrders() {
        return detailOrderRepository.findAll();
    }

    @Override
    public DetailOrder getDetailOrderById(DetailOrderPK id) {
        return detailOrderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("DetailOrder not found"));
    }

    @Override
    public DetailOrder addDetailOrder(DetailOrder detailOrder) {
        return detailOrderRepository.save(detailOrder);
    }

    @Override
    public DetailOrder updateDetailOrder(DetailOrder detailOrder) {
        validateDetailOrderExists(detailOrder.getId());
        return detailOrderRepository.save(detailOrder);
    }

    @Override
    public void deleteDetailOrder(DetailOrderPK id) {
        validateDetailOrderExists(id);
        detailOrderRepository.deleteById(id);
    }

    @Override
    public DetailOrder deleteOneDetailOrder(String orderId, String medicineId) {
        List<DetailOrder> detailOrders = detailOrderRepository.findByOrderIdAndMedicineId(orderId, medicineId);
        DetailOrder detailOrderToDelete;
        if (!detailOrders.isEmpty()) {
            detailOrderToDelete = detailOrders.get(0); // Get the first matching detail order
            detailOrderRepository.delete(detailOrderToDelete);
            return detailOrderToDelete;
        }

        return null;
    }

    @Override
    public List<DetailOrder> getDetailOrdersByIdOrder(String idOrder) {
        return detailOrderRepository.findByIdOrder(idOrder);
    }

    @Override
    public long countDetailOrdersByMedicineId(String medicineId) {
        return detailOrderRepository.countBySeriMedicineId(medicineId);
    }

    @Override
    public void deleteDetailOrders(String orderId, String medicineId) {
        List<DetailOrder> detailOrders = detailOrderRepository.findByOrderIdAndMedicineId(orderId, medicineId);
        List<String> seriIds = detailOrders.stream()
                .map(detailOrder -> detailOrder.getSeri().getId())
                .collect(Collectors.toList());

        detailOrderRepository.deleteByOrderIdAndMedicineId(orderId, medicineId);

        // Cập nhật trạng thái của các Seri
        seriService.updateStatusById(seriIds, "new");
    }

    private void validateDetailOrderExists(DetailOrderPK id) {
        if (!detailOrderRepository.existsById(id)) {
            throw new IllegalArgumentException("DetailOrder not found");
        }
    }
}