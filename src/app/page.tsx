// src/app/page.tsx

"use server"

import prisma from "@/lib/prisma";
import UpvoteButton from "@/components/UpvoteButton";
import Leaderboard from "@/components/Leaderboard";

export default async function Home() {

  async function getPlayers() {
    console.log(`getPlayers`)
    const players = await prisma.player.findMany();

    return players;
  }

  const players = await getPlayers();
  console.log(players);

  return (
    <main className="flex-col h-screen">
      <Leaderboard initialPlayers={players} />
      <div className="w-full h-1/2 bg-green-500">
        {players.map((player) => {
          return <UpvoteButton player={player} key={player.id} />;
        })}
      </div>
    </main>
  );
}