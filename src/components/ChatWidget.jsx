import { useState, useCallback } from "react";
import { Launcher } from "react-chat-window";
import "../chat-widget-theme.css"; // your theme (colors)

/* If you used the overlay fix earlier, also import it:
   import "../chat-fix.css";
*/

export default function ChatWidget() {
  const [messageList, setMessageList] = useState([
    {
      author: "them",
      type: "text",
      data: { text: "Hi! Need help with lessons or road tests?" },
    },
  ]);

  // ⬇️ REPLACED: call your server instead of echoing
  const handleMessageWasSent = useCallback(
    async (message) => {
      // 1) show *my* message immediately
      setMessageList((prev) => [...prev, message]);

      try {
        // 2) call your backend with the new text + prior history
        const res = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: message.data.text,
            history: messageList,
          }),
        });

        console.log(res);
        debugger;
        const data = await res.json();
        const reply = data?.reply ?? "Sorry — no reply.";

        // 3) show the AI reply
        setMessageList((prev) => [
          ...prev,
          { author: "them", type: "text", data: { text: reply } },
        ]);
      } catch (err) {
        // 4) show an error message if the request fails
        console.log(err);
        debugger;
        setMessageList((prev) => [
          ...prev,
          {
            author: "them",
            type: "text",
            data: { text: "Sorry — server error. Please try again." },
          },
        ]);
      }
    },
    [messageList] // keep history in sync
  );

  return (
    // If you used the overlay fix:
    // <div className="chat-fix">
    <Launcher
      agentProfile={{
        teamName: "Driving School Support",
        imageUrl:
          "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      }}
      messageList={messageList}
      onMessageWasSent={handleMessageWasSent}
      showEmoji
    />
    // </div>
  );
}
