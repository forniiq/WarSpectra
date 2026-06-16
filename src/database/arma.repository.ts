import { sequelize } from "./index";

export type ArmaPlayer = {
  name: string;
  slot: number;
  level: number;
};

export async function getOnlinePlayers(): Promise<ArmaPlayer[]> {
  const [rows] = await sequelize.query(`
    SELECT 
      s.pName AS name,
      s.Slot AS slot,
      COALESCE(p.pLvl, 1) AS level
    FROM cuprp.stats s
    LEFT JOIN cuprp.players p ON s.pName = p.pName
    ORDER BY s.pLvlSort DESC, s.pName ASC
  `);

  return rows as ArmaPlayer[];
}

export async function getOnlineCount(): Promise<number> {
  const [rows]: any = await sequelize.query(`
    SELECT COUNT(*) as count FROM cuprp.stats
  `);

  return rows[0].count;
}