import { Query } from "mongoose";
import { IQNA, IQNADOC } from "../models/QNA";

export interface IQNARepository {
  createQNA(qnaData: IQNA): Promise<IQNADOC>;
  getQNA(courseId: string): Query<IQNADOC[], IQNADOC, {}>;
  getQNAById(qnaId: string): Query<IQNADOC | null, IQNADOC, {}>;
}
