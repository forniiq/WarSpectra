import type { EventHandler } from 'commandkit';
import { Logger } from 'commandkit/logger';
import { startMonitor } from "../../../tasks/monitor.task";

const handler: EventHandler<'clientReady'> = async (client) => {
  Logger.info(`Logged in as ${client.user.username}!`);

  startMonitor(client);
};

export default handler;
