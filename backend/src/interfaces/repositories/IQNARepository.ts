import { IQNA } from '../models/QNA';

export interface IQNARepository {
  createQNA(qnaData: IQNA): any;
  getQNA(courseId: string): any;
}
