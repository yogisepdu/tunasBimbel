import { useState } from "react";

export const useAlert = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Terjadi Kesalahan");

  const showAlert = (msg: string, customTitle?: string) => {
    setMessage(msg);
    setTitle(customTitle || "Terjadi Kesalahan");
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
  };

  return {
    visible,
    message,
    title,
    showAlert,
    hideAlert,
  };
};
