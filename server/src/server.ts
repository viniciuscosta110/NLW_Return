import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "37073a7b5e0aa5",
    pass: "a24122dd9cb43b"
  }
});

app.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Vinicius Costa <viniciuscosta1900@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;" ></div>`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
    ].join('\n')

  })

  return res.status(201).json({data: feedback})
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})