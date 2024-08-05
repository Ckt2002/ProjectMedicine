package com.medicine.medicine.Service.impl;

import com.medicine.medicine.Entity.Effect;
import com.medicine.medicine.Repository.EffectRepository;
import com.medicine.medicine.Service.EffectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EffectServiceImpl implements EffectService {
    @Autowired
    private EffectRepository effectRepository;

    @Override
    public List<Effect> getAllEffects() {
        return effectRepository.findAll();
    }

    @Override
    public Effect getEffectById(Long id) {
        return effectRepository.findById(id).orElse(null);
    }

    @Override
    public Effect createEffect(Effect effect) {
        if (effectRepository.findByName(effect.getName()).isPresent()) {
            throw new IllegalArgumentException("Effect with name " + effect.getName() + " already exists.");
        }
        return effectRepository.save(effect);
    }

    @Override
    public Effect updateEffect(Effect effectDetails) {
        Effect effect = effectRepository.findById(effectDetails.getId())
                .orElse(null);

        if (!effect.getName().equals(effectDetails.getName()) && effectRepository.findByName(effectDetails.getName()).isPresent()) {
            throw new IllegalArgumentException("Effect with name " + effectDetails.getName() + " already exists.");
        }

        effect.setName(effectDetails.getName());
        return effectRepository.save(effect);
    }

    @Override
    public void deleteEffect(Long id) {
        Effect effect = effectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Effect not found with id: " + id));
        effectRepository.delete(effect);
    }
}
