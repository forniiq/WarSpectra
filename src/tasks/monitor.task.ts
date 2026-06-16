import {
  ActionRowBuilder,
  EmbedBuilder,
  TextChannel,
} from "discord.js";

import { getOnlinePlayers, getOnlineCount } from "../database/arma.repository";
import { formatPlayers } from "../services/arma-format.service";

const CHANNEL_ID = process.env.MONITOR_CHANNEL_ID!;
const MESSAGE_ID = process.env.MONITOR_MESSAGE_ID!;

export async function startMonitor(client: any) {
  const channel = await client.channels.fetch(CHANNEL_ID) as TextChannel;
  if (!channel) return;

  let message = await channel.messages.fetch(MESSAGE_ID).catch(() => null);

  if (!message) {
    message = await channel.send({
      embeds: [new EmbedBuilder().setTitle("Arma Monitor").setDescription("Инициализация...")],
    });
  }

  setInterval(async () => {
    const [players, count] = await Promise.all([
      getOnlinePlayers(),
      getOnlineCount(),
    ]);

    const formatted = formatPlayers(players);

    const embed = new EmbedBuilder()
      .setTitle("🪖 Arma 3 Server Monitor")
      .setColor(0x2b6cb0)
      .addFields(
        { name: "👥 Онлайн", value: `${count}`, inline: true },
        { name: "🗺️ Карта", value: process.env.MAP_NAME ?? "Unknown", inline: true },
        { name: "🌐 IP", value: process.env.SERVER_IP ?? "hidden", inline: true },
        {
          name: `🎮 Игроки (${players.length})`,
          value:
            formatted.length > 0
              ? formatted.map(f => `**${f.name}**\n${f.value}`).join("\n\n")
              : "Пусто",
        }
      )
      .setTimestamp();

    try {
      await message!.edit({ embeds: [embed] });
    } catch (err) {
      console.error("Monitor update error:", err);
    }
  }, 5000);
}