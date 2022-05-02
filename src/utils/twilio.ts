/*
Author: chankruze (chankruze@gmail.com)
Created: Mon May 02 2022 23:25:19 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from 'axios'
import * as cheerio from 'cheerio'
import * as moment from 'moment-timezone'

const getTheHinduPDF = async (): Promise<string> => {
  // get the date
  const date = new Date()
  const today = moment(date).tz('Asia/Kolkata').format('DD MMM YYYY')

  // get the the hindu pdf link
  try {
    const { data } = await axios.get('https://dailyepaper.in/home-point/')

    if (data) {
      const $ = cheerio.load(data)

      // the hndu button
      const theHinduButton = $('tbody > tr > td')[1].children
      const theHinduLink = $(theHinduButton).find('a').attr('href')
      let pdf: string = ''

      // the hndu button link
      if (theHinduLink) {
        const { data } = await axios.get(theHinduLink)

        if (data) {
          // load the hindu pdf page
          const $ = cheerio.load(data)
          const all = $('p > span')

          $(all).each((i, el) => {
            // check the span text for the date
            const text = $(el).text()

            if (text.includes(today)) {
              pdf = $(el).find('a').attr('href')
            }
          })
        }
      }

      // return the pdf link if found
      if (pdf) {
        return `📰 *The Hindu PDF*\n🗓️ ${today}\n🔽 Download ${pdf}`
      }

      // return the error message if not found
      return `📰 *The Hindu PDF*\n🗓️ ${today}\n🔽 No PDF available`
    }
  } catch (error) {
    console.log(error)
    return 'Opps! Something went wrong. Please try again later.'
  }
}

export const parseMessage = async (message: string) => {
  if (message.includes('hindu')) {
    return await getTheHinduPDF()
  }

  if (message.includes('cricket')) {
    return 'Not yet implemented'
  }

  return "Sorry! I don't understand your message. Please try again."
}
