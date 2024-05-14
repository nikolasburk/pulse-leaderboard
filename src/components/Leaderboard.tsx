"use client";

import { Player } from "@prisma/client";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, MutableRefObject, useRef } from "react";

interface EventType {
  after: Player
}

export default function Leaderboard({ initialPlayers }: { initialPlayers: Player[] }) {
  console.log(`initialPlayers (props)`, initialPlayers);
  const [players, setPlayers] = useState(initialPlayers || []);

  // var socket: any;
  let socketRef: MutableRefObject<Socket | null> = useRef(null);

  useEffect(() => {

    console.log(`useEffect`)

    const url = `http://localhost:3001`;

    socketRef.current = io(url);
    socketRef.current.on("player_points", (event: EventType) => {
      console.log(`received event from server`, event)
      const newPlayers = players.map(p => {
        if (p.id === event.after.id) {
          return {
            ...p,
            points: event.after.points,
          }
        }
        return p
      })
      setPlayers(newPlayers)
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
