import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";

type Props = {
  handleStop: any;
  isLoading: boolean;
  setCurretnTranscript: any
};

const RecordMessage = ({ handleStop, isLoading, setCurretnTranscript }: Props) => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && isLoading) {
      console.log('-----------This is the transcript-----', transcript)
      // setTranscripts([...transcripts, transcript]);
      setCurretnTranscript(transcript)
    }
  }, [listening, isLoading, transcript, setCurretnTranscript])

  // console.log('-----------This is the transcript-----', transcript, listening)

  useEffect(() => {
    if (!isLoading) {
      resetTranscript()
    }
  }, [isLoading, resetTranscript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <ReactMediaRecorder
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }) => {
        if (status === 'recording') {
          SpeechRecognition.startListening({ continuous: true });
        }
        if (status === 'stopped') {
          SpeechRecognition.stopListening();
          // resetTranscript();
        }
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
