import { Client, EmbedBuilder, ChannelType } from 'discord.js';
import { Logger } from 'commandkit/logger';

// ID канала логов
const LOGS_CHANNEL_ID = process.env.LOGS_CHANNEL_ID as string; 

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

// Конфиг отображения логов
const LOG_CONFIG = {
    INFO: { color: '#57f287', emoji: 'ℹ️', title: 'Информационный лог' },
    WARN: { color: '#fee75c', emoji: '⚠️', title: 'Предупреждение' },
    ERROR: { color: '#ed4245', emoji: '❌', title: 'Ошибка системы' }
};

let discordClient: any = null;

// Инициализация логгера
export function initLogger(client: any) {
    discordClient = client;
}

// Функция отправки логов. Пример: sendLog(ERROR, "Monitoring", "Ошибка создания сообщения-мониторинга")
export async function sendLog(level: LogLevel, context: string, message: string) {
    const timestamp = new Date().toLocaleString('ru-RU');
    const config = LOG_CONFIG[level];

    // Лог в консоль
    const consoleText = `[${timestamp}] [${level}] [${context}] ${message}`;

    if (level === 'ERROR') console.error(consoleText);
    else if (level === 'WARN') console.warn(consoleText);
    else console.log(consoleText);

    if (!discordClient) {
        return;
    }

    try {
        // Получение канала логов
        const channel = discordClient.channels.cache.get(LOGS_CHANNEL_ID) || await discordClient.channels.fetch(LOGS_CHANNEL_ID);
        
        // Проверка типа канала (только текстовый)
        if (!channel || channel.type !== ChannelType.GuildText) {
            console.error(`❌ [LOGGER] Канал логов с ID ${LOGS_CHANNEL_ID} не найден или это не текстовый канал.`);
            return;
        }

        // Создание Embed
        const logEmbed = new EmbedBuilder()
            .setTitle(`${config.emoji} ${config.title}`)
            .setColor(config.color as any)
            .addFields(
                { name: '📂 Модуль', value: `\`${context}\``, inline: true },
                { name: '📊 Уровень', value: `\`${level}\``, inline: true },
                { name: '💬 Сообщение', value: `\`\`\`${message.slice(0, 1900)}\`\`\``, inline: false }
            )
            .setTimestamp();

        await channel.send({ embeds: [logEmbed] }).catch(() => null);

    } catch (err) {
        Logger.error(`[LOGGER] Не удалось отправить лог в Discord канал: ${err}`);
    }
}