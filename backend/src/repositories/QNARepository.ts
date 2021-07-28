import { IQNA, IQNAModel } from "../interfaces/models/QNA";
import { IQNARepository } from "../interfaces/repositories/IQNARepository";

export class QNARepository implements IQNARepository {
  private QNAModel: IQNAModel;

  constructor(QNAModel: IQNAModel) {
    this.QNAModel = QNAModel;
  }

  getQNAById(qnaId: string) {
    try {
      const qna = this.QNAModel.findById(qnaId)
        .populate("response.user")
        .populate("user");
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

  public createQNA(QNAData: IQNA) {
    try {
      const qna = new this.QNAModel(QNAData);
      return qna.save();
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
