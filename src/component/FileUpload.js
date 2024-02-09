// src/components/FileUploadForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import TypingEffect from "react-typing-effect";

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [password, setPassword] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("filePassword", password);
    formData.append("text", inputText);

    await axios
      .post("http://192.168.1.27:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setMessages((prev) => {
          return [...prev, res.data.result];
        });
        setFile(null);
        setInputText("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setFile(null);
        setInputText("");
        setPassword("");
      });
  };
  useEffect(() => {}, [messages]);

  return (
    <div className="App">
      <div>
        <div className="flex flex-col justify-center items-center">
          <input
            className="file_input "
            type="file"
            placeholder="Choose a file..."
            onChange={handleFileChange}
          />
        </div>

        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <TypingEffect
                text={message}
                speed={20}
                loop={false}
                eraseDelay={999999999}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full input-container items-center ">
        <input
          className="password_input"
          type="password"
          id="myInput"
          placeholder="Enter your file password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <input
          className="prompt_input"
          type="prompt"
          id="myInput"
          placeholder="Enter text which you want to get data.."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          // onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />

        <button
          onClick={
            file == null || password == "" || inputText == ""
              ? null
              : handleSubmit
          }
          style={{
            cursor:
              file == null || password == "" || inputText == ""
                ? "no-drop"
                : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FileUploadForm;
