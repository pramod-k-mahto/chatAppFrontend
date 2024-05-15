import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

function App() {
  const [sendMessage, setSendMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("receive", (messageReceived) => {
      console.log(messageReceived);
      setReceivedMessages((prevMessages) => [...prevMessages, messageReceived]);
    });

    socket.on("id", (id) => {
      setId(id);
    });

    return () => {
      socket.off("connect");
      socket.off("receive");
      socket.off("id");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (sendMessage && id) {
      socket.emit("Message", { sendMessage, id });
      setSendMessage("");
    }
  };

  return (
    <div className="flex border m-1">
      <div className="bg-slate-800 text-white w-96">
        <div className="flex m-4">
          <div>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
              alt="UserImage"
              className="h-10 w-10 rounded-full inline"
            />
          </div>
          <div className="w-2 h-2 rounded-full relative right-2 top-7 bg-green-600"></div>
          <p className="inline">Gita Paudel</p>
        </div>

        <div className="m-4">
          <input
            type="text"
            className="outline-none bg-slate-800 w-80 h-9 rounded-sm border-b-2 border-b-slate-50"
            placeholder="Search"
          />
        </div>

        <div className="h-96 overflow-y-auto">
          {[...Array(5)].map((_, index) => (
            <div className="flex m-4" key={index}>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
                  alt="UserImage"
                  className="h-10 w-10 rounded-full inline"
                />
              </div>
              <div className="w-2 h-2 rounded-full relative right-2 top-7 bg-green-600"></div>
              <p className="inline">Sita Paudel</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[50rem]">
        <div className="bg-white">
          <div className="flex m-4 w-96">
            <div>
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
                alt="UserImage"
                className="h-10 w-10 rounded-full mr-4"
              />
              <div className="w-2 h-2 rounded-full relative left-8 bottom-3 bg-green-600"></div>
            </div>
            <div className="inline">
              <p>Pramod Mahto</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 h-96 p-1 overflow-auto">
          {receivedMessages.map((message, index) => (
            <div key={index} className="float-right clear-both rounded-sm m-2 text-slate-950 bg-white p-1">
              <p className="w-96 p-1">{message}</p>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            className="h-14 w-[40rem] outline-none pt-7 pb-9"
            placeholder="Write a Message"
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
          />
          <button
            type="submit"
            className="h-[4rem] p-2"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
