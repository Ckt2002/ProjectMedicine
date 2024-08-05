package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.DetailDiscount;
import com.medicine.medicine.Entity.DetailDiscountPK;
import com.medicine.medicine.Service.DetailDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detail-discount")
public class DetailDiscountController {

    @Autowired
    private DetailDiscountService detailDiscountService;

    @GetMapping
    public ResponseEntity<List<DetailDiscount>> getAllDetailDiscounts() {
        List<DetailDiscount> detailDiscounts = detailDiscountService.getAllDetailDiscounts();
        return ResponseEntity.ok(detailDiscounts);
    }

    @GetMapping("/{discountId}/{medicineId}")
    public ResponseEntity<DetailDiscount> getDetailDiscountById(
            @PathVariable Long discountId, @PathVariable String medicineId) {
        DetailDiscountPK id = new DetailDiscountPK(discountId, medicineId);
        DetailDiscount detailDiscount = detailDiscountService.getDetailDiscountById(id);
        if (detailDiscount != null) {
            return ResponseEntity.ok(detailDiscount);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/medicine/{medicineId}")
    public ResponseEntity<List<DetailDiscount>> getDetailDiscountsByMedicineId(@PathVariable String medicineId) {
        List<DetailDiscount> detailDiscounts = detailDiscountService.getDetailDiscountsByMedicineId(medicineId);
        return ResponseEntity.ok(detailDiscounts);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDetailDiscount(@RequestBody DetailDiscount detailDiscount) {
        try {
            detailDiscountService.addDetailDiscount(detailDiscount);
            return new ResponseEntity<>("Detail Discount added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<String> updateDetailDiscount(@RequestBody DetailDiscount detailDiscount) {
        try {
            detailDiscountService.updateDetailDiscount(detailDiscount);
            return ResponseEntity.ok("Detail Discount updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{discountId}/{medicineId}")
    public ResponseEntity<String> deleteDetailDiscount(
            @PathVariable Long discountId, @PathVariable String medicineId) {
        try {
            DetailDiscountPK id = new DetailDiscountPK(discountId, medicineId);
            detailDiscountService.deleteDetailDiscount(id);
            return ResponseEntity.ok("Detail Discount deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
