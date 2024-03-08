import { useState, useEffect } from "react";
import axios from "axios";
import ThemeToggler from "../theme-toggler";

type Props = {
  setMessages: any;
};

const greetings = [
  "Good morning, Fam! Today is a blank canvas. paint it with colors of love and happiness.",
  "Good afternoon! May the rest of your day be filled with moments that make you smile.",
  "Hey, friend! Wishing you a wonderful evening filled with moments that make your heart smile.",
];

function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState(0);

  useEffect(() => {
    // Get the current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    // Define thresholds for morning, afternoon, and evening
    const morningThreshold = 12; // 12:00 PM
    const afternoonThreshold = 17; // 5:00 PM

    // Determine the time of day based on the current hour
    let currentTimeOfDay = 0;
    if (currentHour < morningThreshold) {
      currentTimeOfDay = 0;
    } else if (currentHour < afternoonThreshold) {
      currentTimeOfDay = 1;
    } else {
      currentTimeOfDay = 2;
    }

    // Update the state with the determined time of day
    setTimeOfDay(currentTimeOfDay);
  }, []);

  // Reset the conversation
  const resetConversation = async () => {
    setIsResetting(true);

    try {
      const res = await axios.get("http://localhost:8000/reset");

      if (res.status === 200) {
        setMessages([]);
      } else {
        console.error("There was an error with the API request to backend");
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
    }

    setIsResetting(false);
  };
  return (
    <div className="flex justify-between items-center  p-[20px] text-white font-bold shadow title dark:bg-[#012e42] dark:text-white">
      <div className="italic">fam</div>
      <div className="flex items-center justify-center">
        <div className="w-max">
          <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-xl text-white font-bold">
            {greetings[timeOfDay]}
          </h1>
        </div>
      </div>

      <div className="flex">
        <ThemeToggler />
        <button
          onClick={resetConversation}
          className={
            "transition-all duration-300 text-blue-300 hover:text-pink-500" +
            (isResetting && "animate-pulse")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Title;
