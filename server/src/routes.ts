import express from 'express';
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodeMailerMailAdapter';
import { PrismaFeedbacksRepositories } from './repositories/prisma/prismaFeedbacksRepositories';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body

  const prismaFeedbacksRepositories = new PrismaFeedbacksRepositories()
  const nodeMailerMailAdapter = new NodeMailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepositories, 
    nodeMailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type: req.body.type,
    comment: req.body.comment,
    screenshot: req.body.screenshot
  })

  return res.status(201).send()
})