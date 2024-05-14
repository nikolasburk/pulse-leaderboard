"use client";

import { addPoints } from "@/app/actions";
import { Player } from "@prisma/client";

export default function UpvoteButton({ player }: { player: Player }) {
  return (
    <>
      <button
        className="m-12"
        onClick={() => {
          console.log(`button pressed`, player.id, player.username);
          addPoints({ points: 5, playerId: player.id });
        }}
      >
        {player.username}
      </button>
    </>
  );
}
