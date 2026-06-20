// Редактирование игрока

import { findPlayer } from '@/database/queries';
import type { ChatInputCommand, MessageCommand, CommandData, CommandMetadata } from 'commandkit';
import { ApplicationCommandOptionType, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } from 'discord.js';

export const metadata: CommandMetadata = {
    userPermissions: 'Administrator',
    guilds: [process.env.GUILD_ID as string]
}

export const command: CommandData = {
    name: "edit",
    description: "💽Редактирование игрока",
    options: [
        {
            name: "discord",
            description: "Пользователь из Discord",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
        {
            name: "steam",
            description: "Id пользователя из Steam",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "nickname",
            description: "Никнейм пользователя",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ]
}

export const chatInput: ChatInputCommand = async (ctx) => {

    const discordInput = ctx.interaction.options.getUser("discord");
    const steamInput = ctx.interaction.options.getString("steam");
    const nicknameInput = ctx.interaction.options.getString("nickname");

    const inputs = [
        discordInput,
        steamInput,
        nicknameInput
    ].filter(Boolean);

    if (inputs.length !== 1) {
        return await ctx.interaction.reply({
            content: "❌ Необходимо указать один параметр поиска.",
            ephemeral: true
        });
    }

    await ctx.interaction.deferReply({ ephemeral: true });

    await ctx.interaction.editReply({
        content: "🔍 Ищу игрока в базе данных . . ."
    });

    const player = await findPlayer({
        steamId: steamInput ?? undefined,
        nickname: nicknameInput ?? undefined,
        discordId: discordInput?.id
    });

    if (!player) {
        return await ctx.interaction.editReply({
            content: "❌ Игрок не найден"
        });
    }

    const embed = new EmbedBuilder()
        .setTitle(player.pName)
        .setDescription("Выберите категорию для редактирования 🔻")
        .setColor(0x940a0a);

    const menu = new StringSelectMenuBuilder()
        .setCustomId(`edit_category:${player.pUID}`)
        .setPlaceholder("Выберите категорию")
        .addOptions(
            { label: "🪖 Общая информация", value: "general" },
            { label: "📡 Отряд", value: "unit" },
            { label: "📼 Курсы", value: "courses" },
            { label: "🚜 Допуски БТВ", value: "btv" },
            { label: "🛩️ Допуски ВВС", value: "vvs" },
            { label: "🧭 Допуски РП", value: "rp" },
            { label: "📍 Инструктор", value: "kmb" }
        );

    return await ctx.interaction.editReply({
        content: "",
        embeds: [embed],
        components: [
            new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(menu)
        ]
    });
};