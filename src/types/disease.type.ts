export interface IcuCriterion {
  id: string;
  name: string;
}

export interface ResistanceRisk {
  id: string;
  name: string;
}

export interface DiseasePathogen {
  id: string;
  pathogen: { name: string };
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  requiredIcuMainCriteria: number;
  requiredIcuSecondaryCriteria: number;
  icuHospitalizedCriteria: IcuCriterion[];
  resistanceRisks: ResistanceRisk[];
  diseasePathogens: DiseasePathogen[];
}