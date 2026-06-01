export interface CriterionDetail {
  id: string;
  name: string;
  type: "numeric" | "boolean";
  min: number | null;
  max: number | null;
  unit: string | null;
  isExclusive: boolean | null;
}

export interface IcuCriterion {
  id: string;
  diseaseId: string;
  criterion: CriterionDetail;
  isMainCriteria: boolean;
}

export interface ResistanceRisk {
  id: string;
  diseaseId: string;
  pathogen: {
    id: string;
    name: string;
    description: string;
  };
  criterion: CriterionDetail;
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
