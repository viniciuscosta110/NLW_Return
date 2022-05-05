import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepositories } from "../repositories/feedbacksRepositories";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbackRepositories: FeedbacksRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request : SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot} = request

    if(!type) {
      throw new Error('Type is required')
    }

    if(!comment) {
      throw new Error('Comment is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Screenshot must be a base64 encoded image')
    }

    await this.feedbackRepositories.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;" ></div>`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
      ].join('\n')
    })
  }
}