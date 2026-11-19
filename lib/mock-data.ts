import type { ClubItem, NewsItem, PlayerItem, TournamentItem } from "./api";

export const mockNews: NewsItem[] = [
  {
    code: "abc",
    title: "Yangi turnir e’lon qilindi",
    body: "PUBG Mobile bo‘yicha yangi yakka turnir ariza qabul qilmoqda.\n\nQoidalar bot orqali DOC ko‘rinishida olinadi.",
    photoFileId: null,
    createdAt: "2026-11-18T10:00:00Z",
  },
  {
    code: "def",
    title: "Klublar ro‘yxati yangilandi",
    body: "Yangi klublar qo‘shildi. Batafsil ma’lumot saytda.",
    photoFileId: null,
    createdAt: "2026-11-19T08:30:00Z",
  },
];

export const mockTournaments: TournamentItem[] = [
  {
    code: "T1x9",
    name: "HALDRYX Cup #1",
    game: "PUBG Mobile",
    mode: "team_match",
    status: "started",
    description: "Jamoalar o‘zaro o‘ynaydi. Har bir jamoada 4 asosiy o‘yinchi.",
    scheduledStart: "2026-11-20T10:00:00Z",
    participantLimit: null,
    maxTeams: 8,
    mainPlayers: 4,
    reservePlayers: 1,
    startMinimum: 4,
    individuals: 0,
    teams: 6,
    bannerFileId: null,
    createdAt: "2026-11-15T09:00:00Z",
  },
  {
    code: "Kq7m",
    name: "Chess Yakka Turnir",
    game: "Chess",
    mode: "individual",
    status: "open",
    description: "Yakka format. Ariza ochiq, ishtirokchilar soni cheklangan.",
    scheduledStart: null,
    participantLimit: 32,
    maxTeams: null,
    mainPlayers: null,
    reservePlayers: 0,
    startMinimum: 8,
    individuals: 12,
    teams: 0,
    bannerFileId: null,
    createdAt: "2026-11-17T12:00:00Z",
  },
];

export const mockClubs: ClubItem[] = [
  {
    name: "Falcons",
    leader: "Ali V.",
    members: [
      { name: "Ali V.", role: "leader" },
      { name: "Sardor K.", role: "member" },
      { name: "Javohir M.", role: "member" },
    ],
  },
  {
    name: "Nova",
    leader: "Dilshod R.",
    members: [
      { name: "Dilshod R.", role: "leader" },
      { name: "Aziz T.", role: "member" },
    ],
  },
];

export const mockPlayers: PlayerItem[] = [
  { name: "Ali V.", region: "Toshkent shahri", games: ["PUBG Mobile", "Chess"] },
  { name: "Sardor K.", region: "Samarqand viloyati", games: ["Dota 2"] },
  { name: "Javohir M.", region: "Toshkent viloyati", games: ["Free Fire", "CS:GO"] },
  { name: "Dilshod R.", region: "Farg‘ona viloyati", games: ["eFootball"] },
];