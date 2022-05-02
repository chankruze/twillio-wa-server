/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import helmet from 'helmet'
// routes
import rootRoutes from './routes'
import lessonRoutes from './routes/lesson'

class App {
  public app;

  constructor () {
    this.app = express()
    this.useMiddlewares()
    this.mountRoutes()
  }

  private useMiddlewares (): void {
    this.app.use(helmet(), cors(), morgan('dev'), express.json())
  }

  private mountRoutes (): void {
    // mount routes
    this.app.use('/', rootRoutes)
    this.app.use('/lesson', lessonRoutes)
  }
}

export default new App().app
