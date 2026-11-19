import { mockClubs, mockNews, mockPlayers, mockTournaments } from "./mock-data";

export type NewsItem = {
  code: string;
  title: string;
  body: string;
  photoFileId: string | null;
  createdAt: string | null;
};

export type TournamentMode = "individual" | "team_match" | "battle_royale";
export type TournamentStatus = "open" | "started";

export type TournamentItem = {
  code: string;
  name: string;
  game: string;
  mode: TournamentMode;
  status: TournamentStatus;
  description: string;
  scheduledStart: string | null;
  participantLimit: number | null;
  maxTeams: number | null;
  mainPlayers: number | null;
  reservePlayers: number;
  startMinimum: number;
  individuals: number;
  teams: number;
  bannerFileId: string | null;
  createdAt: string | null;
};

export type ClubMember = {
  name: string;
  role: "leader" | "member";
};

export type ClubItem = {
  name: string;
  leader: string;
  members: ClubMember[];
};

export type PlayerItem = {
  name: string;
  region: string;
  games: string[];
};

export async function getNews(limit = 50): Promise<NewsItem[]> {
  const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100);
  return mockNews.slice(0, safeLimit);
}

export async function getNewsItem(code: string): Promise<NewsItem | null> {
  return mockNews.find((item) => item.code === code) ?? null;
}

export async function getTournaments(): Promise<TournamentItem[]> {
  const rank: Record<TournamentStatus, number> = { started: 0, open: 1 };
  return [...mockTournaments].sort((a, b) => rank[a.status] - rank[b.status]);
}

export async function getClubs(): Promise<ClubItem[]> {
  return mockClubs;
}

export async function getPlayers(): Promise<PlayerItem[]> {
  return mockPlayers;
}



// Mavjud funksiyalar saqlanadi: getTournaments, getNews, getNewsItem,
// getPlayers, getClubs, getTournament (agar bo'lsa)

// YANGI: turnir detali
export type TournamentDetail = TournamentItem & {
  rules?: string | null;
  format?: string | null;
  prize?: string | null;
  bracketUrl?: string | null;
  streamUrl?: string | null;
  currentRound?: string | null;
  totalRounds?: number | null;
  matches?: TournamentMatch[];
  participants?: TournamentParticipant[];
};

export type TournamentMatch = {
  id: string;
  round: number;
  roundName: string;
  playerA: string;
  playerB: string;
  scoreA?: number | null;
  scoreB?: number | null;
  status: "pending" | "live" | "finished";
  scheduledStart?: string | null;
  winner?: string | null;
};

export type TournamentParticipant = {
  id?: string;
  name: string;
  region?: string | null;
  club?: string | null;
  seed?: number | null;
  status?: "active" | "eliminated" | "winner" | null;
  wins?: number;
  losses?: number;
};

export async function getTournamentDetail(
  code: string,
): Promise<TournamentDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tournaments/${code}`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) return null;
    return (await res.json()) as TournamentDetail;
  } catch {
    return null;
  }
}