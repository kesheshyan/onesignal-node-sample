import { Command, ux } from '@oclif/core'
import { appId } from '../../flags/common'
import { test } from '../../flags/app'
import { osClient } from '../../client'

export default class Update extends Command {
  static description =
    'Updates the name or configuration settings of an existing OneSignal app.'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    appId: appId({ required: true }),
    test: test(),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Update)

    try {
      ux.action.start('Updating app')
      const result = await osClient.updateApp(flags.appId, {})
      this.logJson(result)
      ux.action.stop()
    } catch (error) {
      this.logToStderr('Failed to update app', (error as Error).message)
    }
  }
}
