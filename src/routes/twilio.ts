/*
Author: chankruze (chankruze@gmail.com)
Created: Mon May 02 2022 23:16:55 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import { parseMessage } from '../utils/twilio'
const MessagingResponse = require('twilio').twiml.MessagingResponse

const router = express.Router()

router.post('/', async (req, res) => {
  const twiml = new MessagingResponse()

  // parse message
  const reply = await parseMessage(req.body.Body)

  const message = twiml.message()
  message.body(reply)
  //   message.media(
  //     'https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg'
  //   )

  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(twiml.toString())
})

export default router
