// Получение данных из базы данных

import { sequelize } from "./connect";

export interface OnlinePlayer {
    pName: string;
    pLvl: string;
    pLvlSort: number;
    Slot: string;
}

export interface ZBDInfo {
    City: string;
    Time: number;
    FPS: string;
}

export interface PlayerInfo {
    pUID: string;
    pName: string;
    pLvl: string;
    pExp: number;
    pUnits: string;
    DiscID: string | null;
}

export async function findPlayer(search: {
    steamId?: string;
    nickname?: string;
    discordId?: string;
}): Promise<PlayerInfo | null> {

    const replacements: Record<string, string> = {};

    let whereField: string | null = null;

    if (search.steamId) {
        whereField = "pUID";
        replacements.value = search.steamId;
    }

    else if (search.nickname) {
        whereField = "pName";
        replacements.value = search.nickname;
    }

    else if (search.discordId) {
        whereField = "DiscID";
        replacements.value = search.discordId;
    }

    else {
        return null;
    }

    const [rows] = await sequelize.query(
        `
        SELECT
            pUID,
            pName,
            pLvl,
            pExp,
            pUnits,
            DiscID
        FROM players
        WHERE ${whereField} = :value
        LIMIT 1
        `,
        {
            replacements
        }
    );

    const result = (rows as PlayerInfo[])[0];

    return result ?? null;
}

// Количество игроков на сервере
export async function getOnlineCount() {
    const [rows] = await sequelize.query(`
        SELECT COUNT(*) as count
        FROM players_online    
    `);

    return (rows as any)[0].count as number;
}

// Подробный онлайн игроков
export async function getOnlinePlayers(): Promise<OnlinePlayer[]> {
    const [rows] = await sequelize.query(`
        SELECT
            p.pName,
            s.pLvl,
            s.pLvlSort,
            s.Slot
        FROM stats o
        INNER JOIN players p
            ON o.pUID = p.pUID
        INNER JOIN stats s
            ON p.pName = s.pName
        ORDER BY s.pLvlSort DESC, p.pName ASC
    `);

    return rows as OnlinePlayer[];
}

// Получение текущего ЗБД
export async function getCurrentZbd(): Promise<ZBDInfo | null> {
    const [rows] = await sequelize.query(`
        SELECT
            City,
            Time,
            FPS
        FROM info
        ORDER BY Time DESC
        LIMIT 1
    `);

    const result = (rows as ZBDInfo[])[0];

    return result ?? null;
}