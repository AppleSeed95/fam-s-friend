import { useState } from "react";
import './App.css';
import axios from "axios";
import RecordMessage from "./components/RecordMessage";
import Title from "./components/Title";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const createBlobURL = (data: any) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    return window.URL.createObjectURL(blob);
  }


  const handleStop = async (blobUrl: string) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr = [...messages, myMessage];

    // convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // send form data to api endpoint
        await axios
          .post("http://localhost:8000/post-audio", formData, {
            headers: {
              "Content-Type": "audio/mpeg",
            },
            responseType: "arraybuffer", // Set the response type to handle binary data
          })
          .then((res: any) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobURL(blob);

            // Append to audio
            const famMessage = { sender: "fam", blobUrl: audio.src };
            messagesArr.push(famMessage);
            setMessages(messagesArr);

            // Play audio
            setIsLoading(false);
            audio.play();
          })
          .catch((err: any) => {
            console.error(err);
            setIsLoading(false);
          });
      });
  };

  return (
    <div className="h-screen overflow-y-hidden">
      {/* Title */}
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        {/* Conversation */}
        <div className="px-5 flex">
          <div className=" flex justify-center items-center w-[25%]">
            <img className="w-[500px] fixed top-[300px]" src="./images/bot1.png" alt="Description" />
          </div>
          <div className="mx-auto w-[50%]">

            <img src="https://firebasestorage.googleapis.com/v0/b/ideta-prod.appspot.com/o/bots%2F-NSFLOC9N5JEtZItZD7i%2Fmedia%2Fimages%2F-GIF-Nuki-accueil-raccourci.gif-1681395461872?alt=media&token=69cf98b3-63e9-4e23-b96d-9c77ed6991b7" alt="im" className="text-center flex items-center mx-auto w-[350px]" />

            {
              messages.length === 0 && !isLoading && (
                <div className="text-center font-light italic mt-10">
                  Send Fam a message...
                </div>
              )
            }

            {
              isLoading && (
                <div className="text-center font-light italic mt-10 animate-pulse">
                  Wait a few seconds...
                </div>
              )
            }
            {
              messages?.map((audio, index) => {
                return (
                  <div
                    key={index + audio.sender}
                    className={
                      "flex flex-col " +
                      (audio.sender === "fam" && "flex items-end")
                    }
                  >
                    {/* Sender */}
                    <div className="mt-4 ">
                      <p
                        className={
                          audio.sender === "fam"
                            ? "text-right mr-2 italic text-green-500"
                            : "ml-2 italic text-blue-500"
                        }
                      >
                        {audio.sender}
                      </p>

                      {/* Message */}
                      <audio
                        src={audio.blobUrl}
                        className="appearance-none"
                        controls
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className=" flex justify-center items-center w-[25%]">
            <img className="w-[500px] fixed top-[250px]" src="./images/bot2.jpg"

              alt="Description" />
          </div>

        </div>

        {/* Recorder */}
        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">
          <div className="flex justify-center items-center w-full">
            <div>
              <RecordMessage handleStop={handleStop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
