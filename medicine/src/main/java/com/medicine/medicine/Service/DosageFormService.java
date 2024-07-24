package com.medicine.medicine.Service;

import com.medicine.medicine.Entity.DosageForm;

import java.util.List;

public interface DosageFormService {

    List<DosageForm> getAllDosageForms();

    DosageForm getDosageFormById(Long id);

    DosageForm getDosageFormByName(String name);

    DosageForm addDosageForm(DosageForm dosageForm);

    DosageForm updateDosageForm(DosageForm dosageForm);

    void deleteDosageForm(Long id);
}
