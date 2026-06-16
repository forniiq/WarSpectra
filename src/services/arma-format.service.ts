import { ArmaPlayer } from "../database/arma.repository";
import { getRank, getRankEmoji } from "./rank.service";

function cleanName(name: string) {
  return name.replace(/^\[[^\]]+\]\s*/, "");
}

export function formatPlayers(players: ArmaPlayer[]) {
  return players.map(p => {
    const rank = getRank(p.level);
    const emoji = getRankEmoji(p.level);

    return {
      name: `${emoji} ${cleanName(p.name)}`,
      value: `**${rank}** • Slot ${p.slot}`,
      inline: false,
    };
  });
}