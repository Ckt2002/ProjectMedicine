package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.Effect;

import java.util.List;

public interface EffectService {
    List<Effect> getAllEffects();

    Effect getEffectById(Long id);

    Effect createEffect(Effect effect);

    Effect updateEffect(Effect effectDetails);

    void deleteEffect(Long id);
}
