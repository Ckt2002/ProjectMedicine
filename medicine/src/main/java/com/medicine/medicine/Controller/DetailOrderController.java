package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.DetailOrder;
import com.medicine.medicine.Entity.DetailOrderPK;
import com.medicine.medicine.Service.DetailOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detail-order")
public class DetailOrderController {

    @Autowired
    private DetailOrderService detailOrderService;

    @GetMapping
    public ResponseEntity<List<DetailOrder>> getAllDetailOrders() {
        List<DetailOrder> detailOrders = detailOrderService.getAllDetailOrders();
        return new ResponseEntity<>(detailOrders, HttpStatus.OK);
    }

    @GetMapping("/{idOrder}/{idSeri}")
    public ResponseEntity<DetailOrder> getDetailOrderById(@PathVariable String idOrder, @PathVariable String idSeri) {
        DetailOrderPK id = new DetailOrderPK(idOrder, idSeri);
        try {
            DetailOrder detailOrder = detailOrderService.getDetailOrderById(id);
            return new ResponseEntity<>(detailOrder, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addDetailOrder(@RequestBody DetailOrder detailOrder) {
        try {
            DetailOrder createdDetailOrder = detailOrderService.addDetailOrder(detailOrder);
            return new ResponseEntity<>("DetailOrder created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{idOrder}/{idSeri}")
    public ResponseEntity<String> updateDetailOrder(@PathVariable String idOrder, @PathVariable String idSeri, @RequestBody DetailOrder detailOrder) {
        try {
            detailOrder.getId().setIdOrder(idOrder);
            detailOrder.getId().setIdSeri(idSeri);
            DetailOrder updatedDetailOrder = detailOrderService.updateDetailOrder(detailOrder);
            return new ResponseEntity<>("DetailOrder updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{idOrder}/{idSeri}")
    public ResponseEntity<String> deleteDetailOrder(@PathVariable String idOrder, @PathVariable String idSeri) {
        DetailOrderPK id = new DetailOrderPK(idOrder, idSeri);
        try {
            detailOrderService.deleteDetailOrder(id);
            return new ResponseEntity<>("DetailOrder deleted successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/order/{idOrder}")
    public List<DetailOrder> getDetailOrdersByIdOrder(@PathVariable String idOrder) {
        return detailOrderService.getDetailOrdersByIdOrder(idOrder);
    }

    @GetMapping("/count-by-medicine/{medicineId}")
    public long countDetailOrdersByMedicineId(@PathVariable String medicineId) {
        return detailOrderService.countDetailOrdersByMedicineId(medicineId);
    }

    @DeleteMapping("/order/{orderId}/medicine/{medicineId}")
    public ResponseEntity<DetailOrder> deleteOneDetailOrder(@PathVariable String orderId, @PathVariable String medicineId) {
        try {
            return ResponseEntity.ok(detailOrderService.deleteOneDetailOrder(orderId, medicineId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{orderId}/medicine/{medicineId}")
    public ResponseEntity<String> deleteOneDetailOrders(@PathVariable String orderId, @PathVariable String medicineId) {
        try {
            detailOrderService.deleteDetailOrders(orderId, medicineId);
            return ResponseEntity.ok("DetailOrder deleted successfully and Seri status updated");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error deleting DetailOrder: " + e.getMessage());
        }
    }
}