"use client";

import { Player } from "@prisma/client";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, MutableRefObject, useRef } from "react";

interface UpdateEventType {
  after: Player;
}

export default function Leaderboard({ initialPlayers }: { initialPlayers: Player[] }) {
  console.log(`initialPlayers (props)`, initialPlayers);
  const [players, setPlayers] = useState(initialPlayers || []);

  let socketRef: MutableRefObject<Socket | null> = useRef(null);

  useEffect(() => {
    const updatePoints = (player: Player) => {
      const newPlayers = players.map((p) => {
        if (p.id === player.id) {
          return {
            ...p,
            points: player.points,
          };
        }
        return p;
      });
      setPlayers(newPlayers);
    };

    const url = `http://localhost:3001`;

    socketRef.current = io(url);

    // An update to a player's points
    socketRef.current.on("player_points", (event: UpdateEventType) => {
      console.log(`received UPDATE event from server`, event);
      updatePoints(event.after);
    });

    return () => {
      socketRef.current?.off("player_points");
    };
  }, [players]);

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
