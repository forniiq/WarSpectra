import { EDIT_CATEGORIES } from '@/config/editCategories';
import { sendLog } from '@/utils/logger';
import { EventHandler } from 'commandkit';
import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

const handler: EventHandler<"interactionCreate"> = async (interaction) => {
    if (!interaction.guild) return;
    if (!interaction.isStringSelectMenu()) return;
    if (!interaction.customId.startsWith("edit_category:")) return;

    const pUID = interaction.customId.split(":")[1];
    const categoryId = interaction.values[0];

    if (!categoryId) return;

    const category =
        EDIT_CATEGORIES[categoryId as keyof typeof EDIT_CATEGORIES];

    if (!category) return;

    const menu = new StringSelectMenuBuilder()
        .setCustomId(`edit_field:${pUID}:${categoryId}`)
        .setPlaceholder(`Выбор поля: ${category.name}`);

    for (const field of category.fields) {
        menu.addOptions({
            label: field.name,
            value: String(field.id)
        });
    }

    await interaction.update({
        content: `📂 Категория: ${category.name}`,
        embeds: [],
        components: [
            new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(menu)
        ]
    });
}

export default handler;