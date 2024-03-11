import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";

type Props = {
  handleStop: any;
};

const RecordMessage = ({ handleStop }: Props) => {
  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => {
        return (
          <div className="mt-2">
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              className="button dark:bg-[#024361] bg-white p-4 rounded-full"
            >
              <RecordIcon
                classText={
                  status === "recording"
                    ? "animate-pulse text-red-500"
                    : "text-sky-500 dark:text-white"
                }
              />
            </button>
            <p className="mt-2 dark:text-white font-light">{status}</p>
          </div>
        );
      }}
    />
  );
};

export default RecordMessage;
