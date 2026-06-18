import { Client, EmbedBuilder, TextChannel, ActivityType } from "discord.js";
import { sendLog } from "@/utils/logger";
import { getOnlinePlayers, OnlinePlayer } from "@/database/queries";

const MAX_PLAYERS = 115;

let lastHash = "";

let peakOnlineToday = 0;
let peakResetDate = new Date().toDateString();

// Запуск мониторинга
export async function StartMonitorUpdater(client: Client) {
    const channelId = process.env.MONITOR_CHANNEL_ID!;
    const messageId = process.env.MONITOR_MESSAGE_ID!;

    // Получение канала
    const channel = await client.channels.fetch(channelId);

    if (!channel || !channel.isTextBased()) {
        sendLog("ERROR", "Monitor", "Канал не найден или не текстовый");
        return;
    }

    const textChannel = channel as TextChannel;

    let message = null;

    // Поиск старого сообщения
    if (isValidId(messageId)) {
        message = await textChannel.messages.fetch(messageId).catch(() => null);
    }

    // Создание нового сообщения
    if (!message) {
        const players = await getOnlinePlayers();

        message = await textChannel.send({
            embeds: createEmbeds(players),
        });

        lastHash = buildHash(players);

        sendLog("INFO", "Monitor", `Создан новый мониторинг онлайна: ${message.id}`);
    }

    // Установка текущего хэша
    const initialPlayers = await getOnlinePlayers();
    lastHash = buildHash(initialPlayers);

    // Основной цикл обновления мониторинга
    setInterval(async () => {
        try {
            const players = await getOnlinePlayers();

            const status =
                players.length === 0
                    ? "Сервер пуст"
                    : `${players.length} Игроков на сервере`;

            client.user?.setActivity(status, {
                type: ActivityType.Watching
            });

            const today = new Date().toDateString();

            if (today !== peakResetDate) {
                peakResetDate = today;
                peakOnlineToday = players.length;
            }

            if (players.length > peakOnlineToday) {
                peakOnlineToday = players.length;
            }

            const currentHash = buildHash(players);

            if (currentHash !== lastHash) {
                lastHash = currentHash;
            }

            await message.edit({
                embeds: createEmbeds(players),
            });

        } catch (err) {
            console.error(err);
        }
    }, 30_000);
}

function isValidId(id: string | undefined): id is string {
    return !!id && id.length > 10;
}

// Создание Hash текущего списка игроков
function buildHash(players: OnlinePlayer[]): string {
    return JSON.stringify(
        players.map(p => ({
            name: p.pName,
            rank: p.pLvlSort,
            slot: p.Slot
        }))
    );
}

// Цвет статуса Embed
function getStatusColor(online: number): number {
    if (online === 0)
        return 0x1f1f1f;

    if (online <= 10)
        return 0x533b2e;

    if (online <= 25)
        return 0x73603c;

    if (online <= 40)
        return 0x8a7445;

    if (online <= 55)
        return 0x556b4d;

    if (online <= 70)
        return 0x466e68;

    if (online <= 85)
        return 0x4b658f;

    if (online <= 100)
        return 0x66509a;

    return 0x7b3f8c;
}

// Текст статуса Embed
function getStatusText(online: number): string {
    if (online === 0) return "OFFLINE";

    if (online < 50) return "НИЗКАЯ АКТИВНОСТЬ";

    if (online < 100) return "СРЕДНЯЯ АКТИВНОСТЬ";

    return "ВЫСОКАЯ АКТИВНОСТЬ";
}

function getSlotStats(players: OnlinePlayer[]) {
    const slots = new Map<string, number>();

    for (const player of players) {
        slots.set(
            player.Slot,
            (slots.get(player.Slot) || 0) + 1
        );
    }

    return [...slots.entries()]
        .sort((a, b) => b[1] - a[1]);
}

// Главная функция генерации Embed
function createEmbeds(players: OnlinePlayer[]): EmbedBuilder[] {
    players.sort(
        (a, b) => b.pLvlSort - a.pLvlSort
    );

    const online = players.length;
    const color = getStatusColor(online);

    return [
        createHeaderEmbed(online, color),
        createSlotsEmbed(players, color),
        ...createPlayerEmbeds(players, color)
    ];
}

// Шапка мониторинга
function createHeaderEmbed(online: number, color: number): EmbedBuilder {
    const unix = Math.floor(Date.now() / 1000);

    const load = Math.round(
        (online / MAX_PLAYERS) * 100
    );

    return new EmbedBuilder()
        .setColor(color)
        .setTitle("🌐 «Спектр Войны» Мониторинг Онлайна")
        .setDescription(
            [
                "```yaml",
                `STATUS      | ${getStatusText(online)}`,
                `ONLINE      | ${online}/${MAX_PLAYERS}`,
                `LOAD        | ${load}%`,
                `PEAK TODAY  | ${peakOnlineToday}`,
                `SERVER      | ${process.env.SERVER_IP}:${process.env.SERVER_PORT}`,
                "```",
                "",
                `🕒 Обновлено: <t:${unix}:R>`
            ].join("\n")
        )
        .setFooter({
            text: "Спектр Войны • Live Monitor"
        });
}

function createSlotsEmbed(players: OnlinePlayer[], color: number): EmbedBuilder {
    const slotsText = getSlotStats(players)
        .slice(0, 15)
        .map(([slot, count]) =>
            `${String(count).padStart(2)} │ ${slot}`
        )
        .join("\n");

    return new EmbedBuilder()
        .setColor(color)
        .setTitle("⚙️ Текущие слоты")
        .setDescription(
            `\`\`\`\n${slotsText || "Нет данных"}\n\`\`\``
        );
}

// Создание Embed - Списка игроков
function createPlayerEmbeds(players: OnlinePlayer[], color: number): EmbedBuilder[] {
    const embeds: EmbedBuilder[] = [];

    const chunkSize = 40;

    for (let i = 0; i < players.length; i += chunkSize) {

        const chunk = players.slice(i, i + chunkSize);

        const ranks = chunk
            .map(p => p.pLvl)
            .join("\n");

        const names = chunk
            .map(p => p.pName.substring(0, 18))
            .join("\n");

        const slots = chunk
            .map(p => p.Slot)
            .join("\n");

        embeds.push(
            new EmbedBuilder()
                .setColor(color)
                .setTitle(
                    `🪖 Личный состав (${i + 1}-${Math.min(i + chunkSize, players.length)})`
                )
                .addFields(
                    {
                        name: "📛 Звание",
                        value: `\`\`\`\n${ranks}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "👤 Игрок",
                        value: `\`\`\`\n${names}\n\`\`\``,
                        inline: true
                    },
                    {
                        name: "🎯 Слот",
                        value: `\`\`\`\n${slots}\n\`\`\``,
                        inline: true
                    }
                )
        );
    }

    return embeds;
}