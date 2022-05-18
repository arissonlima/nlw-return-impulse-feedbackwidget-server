import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbacUseCaseRequest{
  type: string,
  comment: string,
  screenshot?: string
}

export class SubmitFeedbackUseCase{
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ){}

  async execute(request: SubmitFeedbacUseCaseRequest){
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error('Type is required.');
    }

    if(!comment){
      throw new Error('Comment is required.');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedget 2',
      body: [
        `<div style="font-family: sans-serif; font-size: 18px; color: #111;">`,
        `<p><b>Tipo do feedback:</b> ${type}</p>`,
        `<p><b>Comentário:</b></p> ${comment}`,
        `<div>`
      ].join('\n')
    })
  }
}