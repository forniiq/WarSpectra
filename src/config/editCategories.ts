export const EDIT_CATEGORIES = {
    general: {
        id: "general",
        name: "Общая информация",
        fields: [
            {
                id: "pLvl",
                name: "Звание",
                type: "select",
                options: [
                    {
                        label: "Новобранец",
                        value: "0"
                    },
                    {
                        label: "Рядовой",
                        value: "1"
                    },
                    {
                        label: "Ефрейтор",
                        value: "2"
                    },
                    {
                        label: "Мл.Сержант",
                        value: "3"
                    },
                    {
                        label: "Сержант",
                        value: "4"
                    },
                    {
                        label: "Ст.Сержант",
                        value: "5"
                    },
                    {
                        label: "Старшина",
                        value: "6"
                    },
                    {
                        label: "Прапорщик",
                        value: "7"
                    },
                    {
                        label: "Ст.Прапорщик",
                        value: "8"
                    },
                    {
                        label: "Мл.Лейтенант",
                        value: "9"
                    },
                    {
                        label: "Лейтенант",
                        value: "10"
                    },
                    {
                        label: "Ст.Лейтенант",
                        value: "11"
                    },
                    {
                        label: "Капитан",
                        value: "12"
                    },
                    {
                        label: "Майор",
                        value: "13"
                    },
                    {
                        label: "Подполковник",
                        value: "14"
                    },
                    {
                        label: "Полковник",
                        value: "15"
                    },
                    {
                        label: "Ген.Майор",
                        value: "16"
                    },
                    {
                        label: "Ген.Лейтенант",
                        value: "17"
                    },
                    {
                        label: "Ген.Полковник",
                        value: "18"
                    },
                    {
                        label: "Ген.Армии",
                        value: "19"
                    },
                    {
                        label: "Маршал",
                        value: "20"
                    }
                ]
            },
            {
                id: "pExp",
                name: "Опыт",
                type: "number"
            }
        ]
    },

    unit: {
        id: "unit",
        name: "Отряд",
        fields: [
            {
                name: "ЦСН Альфа",
                id: "238446"
            },
            {
                name: "ОСН Тайфун",
                id: "234940"
            },
            {
                name: "G4S",
                id: "239203"
            },
            {
                name: "ЧВК Спарта",
                id: "234325"
            },
            {
                name: "ССО",
                id: "225436"
            },
            {
                name: "ОМОН",
                id: "234330"
            },
            {
                name: "УСН ФСО",
                id: "234331"
            },
            {
                name: "ОТГ 141",
                id: "203036"
            },
            {
                name: "Nord Division",
                id: "234235"
            },
            {
                name: "Легион",
                id: "234142"
            },
            {
                name: "СОБР",
                id: "234433"
            },
            {
                name: "ЧВК Bear",
                id: "234238"
            },
            {
                name: "ЧВК Молот",
                id: "234889"
            },
            {
                name: "ДШРГ РУСИЧ",
                id: "234224"
            },
            {
                name: "NATO Response Force",
                id: "234001"
            }
        ]
    },

    courses: {
        id: "courses",
        name: "Курсы",
        fields: [
                {
                id: "0",
                name: "Офицер",
                type: "toggle",
                column: "pSkill"
            },
            {
                id: "1",
                name: "Инженер",
                type: "toggle",
                column: "pSkill"
            },
            {
                id: "2",
                name: "Снайпер",
                type: "toggle",
                column: "pSkill"
            },
            {
                id: "3",
                name: "Медик",
                type: "toggle",
                column: "pSkill"
            },
            {
                id: "4",
                name: "Голубой Берет",
                type: "toggle",
                column: "pSkill"
            },
            {
                id: "5",
                name: "ССО",
                type: "toggle",
                column: "pSkill"
            },
        ]
    },

    btv: {
        id: "btv",
        name: "Допуски БТВ",
        fields: [
            {
                id: "0",
                name: "Механик-водитель БМП",
                type: "toggle",
                column: "pBTV"
            },
            {
                id: "1",
                name: "Гусеничная средняя техника",
                type: "toggle",
                column: "pBTV"
            },
            {
                id: "2",
                name: "Гусеничная тяжелая техника",
                type: "toggle",
                column: "pBTV"
            },
            {
                id: "3",
                name: "Артиллерия",
                type: "toggle",
                column: "pBTV"
            },
        ]
    },

    vvs: {
        id: "vvs",
        name: "Допуски ВВС",
        fields: [
            {
                id: "0",
                name: "Транспортные вертолеты",
                type: "toggle",
                column: "pCYP"
            },
            {
                id: "1",
                name: "Боевые вертолеты",
                type: "toggle",
                column: "pCYP"
            },
            {
                id: "2",
                name: "Транспортные самолеты",
                type: "toggle",
                column: "pCYP"
            },
            {
                id: "3",
                name: "Боевые самолеты",
                type: "toggle",
                column: "pCYP"
            },
        ]
    },

    rp: {
        id: "rp",
        name: "Допуски РП",
        fields: [
            {
                id: "0",
                name: "Зевс",
                type: "toggle",
                column: "pRP"
            },
            {
                id: "1",
                name: "Повстанец",
                type: "toggle",
                column: "pRP"
            },
            {
                id: "2",
                name: "Стрингер",
                type: "toggle",
                column: "pRP"
            },
            {
                id: "3",
                name: "Красный Крест",
                type: "toggle",
                column: "pRP"
            },
            {
                id: "4",
                name: "Нато",
                type: "toggle",
                column: "pRP"
            },
            {
                id: "5",
                name: "Легионер",
                type: "toggle",
                column: "pRP"
            },
        ]
    },

    kmb: {
        id: "kmb",
        name: "Инструктор",
        fields: [
            {
                id: "0",
                name: "Летчиков",
                type: "toggle",
                column: "pKMB"
            },
            {
                id: "1",
                name: "Танкистов",
                type: "toggle",
                column: "pKMB"
            },
            {
                id: "2",
                name: "РП Сторон",
                type: "toggle",
                column: "pKMB"
            },
            {
                id: "3",
                name: "Новобранцев",
                type: "toggle",
                column: "pKMB"
            },
            {
                id: "4",
                name: "Офицеров",
                type: "toggle",
                column: "pKMB"
            },
            {
                id: "5",
                name: "Снайперов",
                type: "toggle",
                column: "pKMB"
            },
            {
                id: "6",
                name: "Инженеров",
                type: "toggle",
                column: "pKMB"
            },
            {
                id: "7",
                name: "Медиков",
                type: "toggle",
                column: "pKMB"
            },
        ]
    }
} as const;