"use client";

import { Player } from "@prisma/client";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

export default function Leaderboard({ initialPlayers }: { initialPlayers: Player[] }) {
  console.log(`initialPlayers (props)`, initialPlayers);
  const [players, setPlayers] = useState(initialPlayers || []);

  var socket: any;
  socket = io("http://localhost:3001");

  useEffect(() => {
    socket.on("player_points", (data: any) => {
      console.log(data)
      // setPlayers()
    });
  }, [socket]);

  return (
    <div className="w-full h-1/2 bg-red-500">
      {players
        .sort((a, b) => b.points - a.points)
        .map((player) => {
          return (
            <div key={player.id}>
              {player.username} ({player.points})
            </div>
          );
        })}
    </div>
  );
}
