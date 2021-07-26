import { IQNA, IQNAModel } from '../interfaces/models/QNA';
import { IQNARepository } from '../interfaces/repositories/IQNARepository';

export class QNARepository implements IQNARepository {
  private QNAModel: IQNAModel;

  constructor(QNAModel: IQNAModel) {
    this.QNAModel = QNAModel;
  }
  addQNAAnswer(qnaId: string, answer: any) {
    try {
      const qna = this.QNAModel.findByIdAndUpdate(qnaId, answer, { new: true });
      return qna;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  getQNAById(qnaId: string) {
    try {
      const qna = this.QNAModel.findById(qnaId);
      return qna;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  getQNA(courseId: string) {
    try {
      const qna = this.QNAModel.find({ course: courseId });
      return qna;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  public createQNA(QNAData: IQNA): any {
    try {
      const qna = new this.QNAModel(QNAData);
      return qna.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
