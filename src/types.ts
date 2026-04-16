export interface Evaluation {
  id: string;
  evaluator: string;
  department: string;
  time: string;
  positiveTags: string[];
  negativeTags: string[];
}

export type WarningStatus = '办理中' | '已办结';

export interface EvaluationItem {
  id: string;
  label: string;
  type: 'positive' | 'negative';
}
