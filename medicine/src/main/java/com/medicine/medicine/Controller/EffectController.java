package com.medicine.medicine.Controller;

import com.medicine.medicine.Entity.Effect;
import com.medicine.medicine.Service.EffectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/effect")
public class EffectController {
    @Autowired
    private EffectService effectService;

    @GetMapping
    public ResponseEntity<List<Effect>> getAllEffects() {
        List<Effect> effects = effectService.getAllEffects();
        return ResponseEntity.ok(effects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Effect> getEffectById(@PathVariable Long id) {
        Effect effect = effectService.getEffectById(id);
        if (effect == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(effect);
    }

    @PostMapping
    public ResponseEntity<Effect> createEffect(@RequestBody Effect effect) {
        try {
            Effect newEffect = effectService.createEffect(effect);
            return ResponseEntity.ok(newEffect);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping
    public ResponseEntity<Effect> updateEffect(@RequestBody Effect effectDetails) {
        try {
            Effect updatedEffect = effectService.updateEffect(effectDetails);
            if (updatedEffect == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updatedEffect);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEffect(@PathVariable Long id) {
        try {
            effectService.deleteEffect(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
