import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  background-color: #3f51b5;
  padding: 1rem;
  color: white;
  font-size: 1.25rem;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ChatBubble = styled.div<{ sender: string }>`
  max-width: 60%;
  padding: 12px;
  margin: 8px 0;
  border-radius: 12px;
  word-wrap: break-word;
  background-color: ${({ sender }) => (sender === "You" ? "#3f51b5" : "#e0e0e0")};
  color: ${({ sender }) => (sender === "You" ? "white" : "black")};
  align-self: ${({ sender }) => (sender === "You" ? "flex-end" : "flex-start")};
`;

const FormWrapper = styled.form`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #ccc;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  margin: 0 1rem;
  font-size: 1rem;
`;

const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  cursor: pointer;
`;

const UploadPrompt = styled.div`
  margin-top: 6rem;
  text-align: center;
  color: #555;
`;

type Message = {
  sender: "You" | "Bot";
  text: string;
};

const ResumeChat: React.FC = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.message) {
        alert(data.message);
        setResumeUploaded(true);
      }
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleAsk = async (e: FormEvent) => {
    e.preventDefault();
    const userQuestion = question;
    setChat((prev) => [...prev, { sender: "You", text: userQuestion }]);
    setQuestion("");
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ question: userQuestion }),
    });

    const data = await res.json();
    setChat((prev) => [...prev, { sender: "Bot", text: data.answer || data.error }]);
    setLoading(false);
  };

  return (
    <Container>
      <Header>💬 Chat with Resume Assistant</Header>

      <ChatArea role="log">
        {!resumeUploaded ? (
          <UploadPrompt>
            Please upload your resume below to begin chatting.
            <div style={{ marginTop: "2rem" }}>
              <UploadLabel htmlFor="resume-upload">
                <FiUpload size={20} />
                <span style={{ marginLeft: "0.5rem" }}>
                  {uploading ? "Uploading..." : "Upload Resume"}
                </span>
                <UploadInput
                  type="file"
                  id="resume-upload"
                  accept=".pdf"
                  onChange={handleUpload}
                  aria-label="Upload your resume"
                />
              </UploadLabel>
            </div>
          </UploadPrompt>
        ) : (
          chat.map((msg, index) => (
            <ChatBubble key={index} sender={msg.sender}>
              <strong>{msg.sender}:</strong> <div>{msg.text}</div>
            </ChatBubble>
          ))
        )}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div className="spinner" /> <span>Bot is typing...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </ChatArea>

      {resumeUploaded && (
        <FormWrapper onSubmit={handleAsk}>
          <UploadLabel htmlFor="upload-resume">
            <FiUpload size={20} />
            <UploadInput
              type="file"
              id="upload-resume"
              accept=".pdf"
              onChange={handleUpload}
              aria-label="Re-upload your resume"
            />
          </UploadLabel>
          <TextInput
            type="text"
            value={question}
            placeholder="Ask about your resume..."
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <SubmitButton type="submit">Send</SubmitButton>
        </FormWrapper>
      )}
    </Container>
  );
};

export default ResumeChat;
