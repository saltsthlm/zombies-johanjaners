import { ok } from "node:assert/strict";
import { test } from "node:test";

const createRoom = (capacity: number) => {
  let zombies: string [] = [];

  return {
    isFull: () => zombies.length >= capacity,
    add: (name: string) => {
      if (capacity === 0) return;
      if (zombies.length >= capacity) zombies.shift(); // eat oldest
      zombies.push(name);
    },
    getAll: () => [...zombies],
  };
};

test("room is full", () => {
  const room = createRoom(0);

  const isRoomFull = room.isFull();

  ok(isRoomFull);
});

test("empty room that fits one zombie is not full", () => {
  // arrange
  const room = createRoom(1);
  // act
  // assert
  ok(!room.isFull());
});

test("room with no capacity cannot fit any zombies", () => {
  const room = createRoom(0);
  room.add("A");
  ok(room.getAll().length === 0);
});

test("one-roomer becomes full when a zombie is added", () => {
  const room = createRoom(1);
  room.add("A");
  ok(room.isFull());
});

test("two-roomer is not full when a zombie is added", () => {
  // arrange
  const room = createRoom(2);
  // act
  room.add("A");
  // assert 
  ok(!room.isFull());
});

test("second zombie consumes first zombie when added to a one-roomer", () => {
  // arrange
  const room = createRoom(1);
  // act
  room.add("A");
  room.add("B");
  const all = room.getAll();
  // assert
  ok(all.length === 1);
  ok(all[0] === "B");
});

// You are free to add more tests that you think are relevant!
