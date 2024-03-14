import { useState } from "react";
import "./App.css";
import axios from "axios";
import RecordMessage from "./components/RecordMessage";
import Title from "./components/Title";
import { OPEN_AI_KEY } from './env'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const [text, setText] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  console.log('--------------------', text, generatedResponse)

  const createBlobURL = (data: any) => {
    const blob = new Blob([data], { type: "audio/mpeg" });
    return window.URL.createObjectURL(blob);
  };

  const model = 'whisper-1'

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

        // try {
        //   const response = await fetch(`https://api.openai.com/v1/audio/${model}/transcribe`, {
        //     method: 'POST',
        //     headers: {
        //       'Authorization': `Bearer ${OPEN_AI_KEY}`,
        //       // 'Content-Type': 'multipart/form-data' is not needed when using FormData in fetch, as it sets the Content-Type automatically with the correct boundary.
        //     },
        //     body: formData
        //   });

        //   const reader = response.body?.getReader();
        //   if (!reader) {
        //     throw new Error('Failed to read response body');
        //   }

        //   let decoder = new TextDecoder();
        //   let result = '';

        //   while (true) {
        //     const { done, value } = await reader.read();
        //     if (done) break;
        //     result += decoder.decode(value, { stream: true });
        //   }

        //   // Make a request to OpenAI API to generate a response
        //   const responseFromOpenAI = await fetch(`https://api.openai.com/v1/audio/${model}/transcribe`, {
        //     method: 'POST',
        //     headers: {
        //       'Authorization': `Bearer ${OPEN_AI_KEY}`,
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       prompt: result,
        //       max_tokens: 100
        //     })
        //   });

        //   const readerOpenAI = responseFromOpenAI.body?.getReader();
        //   if (!readerOpenAI) {
        //     throw new Error('Failed to read response body from OpenAI');
        //   }

        //   let generatedResponse = '';

        //   while (true) {
        //     const { done, value } = await readerOpenAI.read();
        //     if (done) break;
        //     generatedResponse += decoder.decode(value, { stream: true });
        //   }

        //   console.log('Generated response:', generatedResponse);

        //   setIsLoading(false);
        //   setText(result);
        //   setGeneratedResponse(generatedResponse);
        // } catch (error) {

        //   setIsLoading(false);
        //   console.error('Error converting audio to text:', error);
        // }

        // send form data to api endpoint
        await axios
          .post("http://18.219.107.216/post-audio/", formData, {
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
      {/* <img src="/images/bg.jpg" alt="bg" className="bg" /> */}
      <div className="absolute w-full opacity-[0] z-[-1] h-full bg-black dark:opacity-[0.7]"></div>
      {/* Title */}
      <Title setMessages={setMessages} />
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="flex flex-col justify-between h-full overflow-y-auto pb-96">
        {/* Conversation */}
        <div className="px-5 flex">
          <div className="flex justify-center items-center w-[25%]">
            {/* <img
              className="bot dark:opacity-[0] w-[350px] absolute top-[300px] "
              src="./images/bot.png"
              alt="Description"
            /> */}
          </div>
          <div className="flex items-center justify-center">
            {/* <div className="w-max">
              <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-xl text-white font-bold">
                Hi, Fam. How can I help you today?
              </h1>
            </div> */}
          </div>
          <div className="mx-auto w-[50%]">
            {/* <img
              src="https://firebasestorage.googleapis.com/v0/b/ideta-prod.appspot.com/o/bots%2F-NSFLOC9N5JEtZItZD7i%2Fmedia%2Fimages%2F-GIF-Nuki-accueil-raccourci.gif-1681395461872?alt=media&token=69cf98b3-63e9-4e23-b96d-9c77ed6991b7"
              alt="im"
              className="text-center flex items-center mx-auto w-[350px]"
            /> */}

            {
              messages.length === 0 && !isLoading && (
                <div className="text-center text-gray font-light italic mt-10 dark:text-white">
                  Send Fam a message...
                </div>
              )
            }

            {
              isLoading && (
                <div className="flex space-x-2 justify-center items-center dark:invert mt-1">
                  <div className="h-4 w-4 bg-[#072e40] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-4 w-4 bg-[#072e40] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-4 w-4 bg-[#072e40] rounded-full animate-bounce"></div>
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
                        src={audio?.blobUrl}
                        className="appearance-none"
                        controls
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className=" flex justify-center items-center w-[25%]">
            {/* <img
              className="w-[500px] fixed top-[250px]"
              src="./images/bot2.jpg"
              alt="Description"
            /> */}
          </div>
        </div>

        {/* Recorder */}
        <div className="footer fixed bottom-0 py-6 px-[10px] mx-auto block text-center">
          <div>
            <RecordMessage handleStop={handleStop} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
