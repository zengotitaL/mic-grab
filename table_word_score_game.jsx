import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCcw, UserX, RotateCcw } from "lucide-react";

const WORDS = [
  "Love",
  "Heart",
  "Feel",
  "Cry",
  "Smile",
  "Pain",
  "Fear",
  "Hope",
  "Dream",
  "Tear",
  "Alone",
  "Lonely",
  "Happy",
  "Sad",
  "Hate",
  "Miss",
  "Wish",
  "Joy",
  "Peace",
  "Mad",
  "Glad",
  "Proud",
  "Sweet",
  "Cold",
  "Warm",
  "Dark",
  "Light",
  "Blind",
  "Free",
  "You",
  "Me",
  "I",
  "We",
  "They",
  "He",
  "She",
  "Us",
  "Them",
  "Baby",
  "Girl",
  "Boy",
  "Man",
  "Woman",
  "Mother",
  "Father",
  "Friend",
  "Enemy",
  "Lover",
  "Stranger",
  "Angel",
  "Devil",
  "Queen",
  "King",
  "Hero",
  "Star",
  "Soul",
  "Child",
  "Mind",
  "Time",
  "Day",
  "Night",
  "Morning",
  "Evening",
  "Always",
  "Never",
  "Forever",
  "Now",
  "Then",
  "Soon",
  "Today",
  "Yesterday",
  "Tomorrow",
  "Year",
  "Life",
  "World",
  "Earth",
  "Sky",
  "Home",
  "Place",
  "Road",
  "Street",
  "City",
  "Way",
  "Path",
  "Here",
  "There",
  "Where",
  "Go",
  "Come",
  "Run",
  "Walk",
  "Dance",
  "Sing",
  "Say",
  "Talk",
  "Listen",
  "Look",
  "See",
  "Hear",
  "Touch",
  "Taste",
  "Breathe",
  "Laugh",
  "Sleep",
  "Wake",
  "Stand",
  "Fall",
  "Fly",
  "Rise",
  "Wait",
  "Stop",
  "Hold",
  "Keep",
  "Let",
  "And",
  "Or",
  "But",
  "So",
  "Because",
  "If",
  "With",
  "Without",
  "For",
  "To",
  "In",
  "On",
  "At",
  "By",
  "From",
  "Out",
  "Up",
  "Down",
  "Over",
  "Under",
  "Through",
  "About",
  "Like",
  "As",
  "Than",
  "Not",
  "Yes",
  "No",
  "Maybe",
  "Yeah",
  "Oh",
  "Hey",
  "Ah",
  "U",
  "Ya",
  "Just",
  "Really",
  "Very",
  "Well",
  "Woah",
  "Damn",
  "Shh",
  "Ahh",
  "Come-on",
  "Do",
  "Did",
  "Done",
  "Be",
  "Am",
  "Is",
  "Are",
  "Was",
  "Were",
  "Been",
  "Have",
  "Has",
  "Had",
  "Will",
  "Would",
  "Can",
  "Could",
  "Should",
  "Must",
  "May",
  "Might",
  "Want",
  "Need",
  "Think",
  "Know",
  "Believe",
  "Remember",
  "Forget",
  "Good",
  "Bad",
  "Big",
  "Small",
  "Little",
  "Tall",
  "Short",
  "Long",
  "Fast",
  "Slow",
  "Hard",
  "Soft",
  "True",
  "False",
  "Real",
  "Fake",
  "Right",
  "Wrong",
  "High",
  "Low",
  "New",
  "Old",
  "Young",
  "Rich",
  "Poor",
  "Bright",
  "Dim",
  "Loud",
  "Quiet",
];

const ROWS = 8;
const SPACES = 15;
const START_POSITION = 0;

function getRandomWord(currentWord) {
  if (WORDS.length <= 1) return WORDS[0] || "word";
  let next = currentWord;
  while (next === currentWord) {
    next = WORDS[Math.floor(Math.random() * WORDS.length)];
  }
  return next;
}

export default function TableWordScoreGame() {
  const firstWord = useMemo(() => WORDS[Math.floor(Math.random() * WORDS.length)] || "word", []);
  const [word, setWord] = useState(firstWord);
  const [positions, setPositions] = useState(Array(ROWS).fill(START_POSITION));
  const [names, setNames] = useState(Array(ROWS).fill(""));
  const [winner, setWinner] = useState(null);

  const nextWord = () => setWord((current) => getRandomWord(current));

  const moveMarker = (rowIndex, direction) => {
    setPositions((current) =>
      current.map((position, index) => {
        if (index !== rowIndex) return position;
        const nextPosition = Math.max(0, Math.min(SPACES - 1, position + direction));
        if (nextPosition === SPACES - 1 && position !== SPACES - 1) {
          setWinner(names[rowIndex] || `Player ${rowIndex + 1}`);
        }
        return nextPosition;
      })
    );
  };

  const updateName = (rowIndex, value) => {
    setNames((current) => current.map((name, index) => (index === rowIndex ? value : name)));
  };

  const clearNames = () => setNames(Array(ROWS).fill(""));
  const resetScores = () => {
    setPositions(Array(ROWS).fill(START_POSITION));
    setWinner(null);
  };

  if (winner) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4 flex items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-10 shadow-2xl"
        >
          <div className="text-2xl sm:text-4xl font-bold uppercase tracking-widest text-white/80">
            Congratulations!
          </div>
          <div className="mt-6 text-6xl sm:text-8xl md:text-9xl font-black uppercase break-words">
            {winner}
          </div>
          <div className="mt-6 text-xl sm:text-3xl font-semibold text-white/80">
            You made it to the finish!
          </div>
          <Button onClick={resetScores} className="mt-8 rounded-2xl h-12 px-8 text-lg">
            Play again
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 p-2 sm:p-3 flex flex-col gap-2 overflow-hidden">
      <Card className="rounded-2xl shadow-sm border-slate-200">
        <CardContent className="p-3 sm:p-4">
          <button
            onClick={nextWord}
            className="w-full rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md active:scale-[0.99] transition p-3 sm:p-4"
            aria-label="Show another random word"
          >
            <div className="rounded-2xl bg-slate-950 text-white p-3 sm:p-4">
              <motion.div
                key={`top-${word}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-4xl sm:text-5xl md:text-6xl font-black tracking-wide uppercase rotate-180"
              >
                {word}
              </motion.div>
            </div>
            <motion.div
              key={`bottom-${word}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-4xl sm:text-5xl md:text-6xl font-black tracking-wide uppercase mt-6"
            >
              {word}
            </motion.div>
            <div className="mt-2 text-xs text-slate-500">Tap the word to show another word</div>
          </button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm border-slate-200 flex-1 overflow-hidden">
        <CardContent className="p-2 sm:p-3">
          <div className="flex flex-wrap gap-2 justify-center mb-2">
            <Button onClick={clearNames} variant="outline" className="rounded-xl gap-1 h-9 text-xs sm:text-sm">
              <UserX className="h-4 w-4" />
              Clear names
            </Button>
            <Button onClick={resetScores} variant="outline" className="rounded-xl gap-1 h-9 text-xs sm:text-sm">
              <RotateCcw className="h-4 w-4" />
              Reset scores
            </Button>
            <Button onClick={nextWord} className="rounded-xl gap-1 h-9 text-xs sm:text-sm">
              <RefreshCcw className="h-4 w-4" />
              New word
            </Button>
          </div>

          <div className="space-y-1 overflow-auto max-h-[55vh] pr-1">
            {positions.map((position, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-[42px_minmax(72px,96px)_1fr_42px] gap-1 items-center">
                <Button
                  onClick={() => moveMarker(rowIndex, -1)}
                  variant="secondary"
                  className="h-9 w-10 rounded-xl text-lg font-black"
                  aria-label={`Move row ${rowIndex + 1} marker left`}
                >
                  −
                </Button>

                <input
                  value={names[rowIndex]}
                  onChange={(event) => updateName(rowIndex, event.target.value)}
                  placeholder={`Player ${rowIndex + 1}`}
                  className="h-9 rounded-xl border border-slate-200 bg-white px-2 text-xs sm:text-sm font-semibold shadow-sm outline-none focus:ring-2 focus:ring-slate-300"
                  aria-label={`Player name for row ${rowIndex + 1}`}
                />

                <div className="grid grid-cols-15 gap-[2px] rounded-xl bg-white border border-slate-200 p-[2px] shadow-inner">
                  {Array.from({ length: SPACES }).map((_, spaceIndex) => {
                    const isMarker = position === spaceIndex;
                    return (
                      <div
                        key={spaceIndex}
                        className="relative h-7 sm:h-8 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden"
                      >
                        {isMarker && (
                          <div
                            className="absolute inset-0 m-[1px] rounded-md bg-slate-900 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center px-[1px] text-center leading-none shadow-md pointer-events-none"
                          >
                            {names[rowIndex] || rowIndex + 1}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Button
                  onClick={() => moveMarker(rowIndex, 1)}
                  variant="secondary"
                  className="h-9 w-10 rounded-xl text-lg font-black"
                  aria-label={`Move row ${rowIndex + 1} marker right`}
                >
                  +
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
