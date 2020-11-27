import * as fs from 'fs'
import { GluegunCommand } from 'gluegun'
import {
  input
} from '../utils/ps5bot-util'

const command: GluegunCommand = {
  name: 'ps5bot',
  run: async toolbox => {
    const { prompt, print } = toolbox
    print.info(`
    Welcome to your CLI. Please enter your checkout info in the following prompts.
    All data will only be stored in your computer. 
    You can choose to fill out the configs in config.json based on template provided in configTemplate.json.
    `)
    const cvv = await input('cvv', prompt, print)
    const targetEmail = await input('Target Email', prompt, print)
    const targetPassword = await input('Target Password', prompt, print)
    const bestBuyEmail = await input('BestBuy Email', prompt, print)
    const bestBuyPassword = await input('BestBuy Password', prompt, print)

    print.info(`
    ...Saving config...
    The next settings are optional.
    `)
    const config: { [key: string]: string } = {
      cvv,
      targetEmail,
      targetPassword,
      bestBuyEmail,
      bestBuyPassword
    }
    fs.writeFileSync('../config.json', JSON.stringify(config, null, 4))

    print.info(`
    ...Saving final config...
    `)
    fs.writeFileSync('../config.json', JSON.stringify(config, null, 4))

    print.info(`
    We're ready to go. Enter the following comand to run the scraper:

      ps5bot scrape
    `)
  }
}

module.exports = command
