import ReactMarkdown from "react-markdown";
import RemarkMath from "remark-math";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
  RefObject,
} from "react";
import styles from "./chat.module.scss";
import { Button } from "@mui/material";
import { asyncAdd, addvalue } from "../store/action";
import Avatar from "@mui/joy/Avatar";
import { useDispatch, useSelector } from "react-redux";

export function Chat() {
  const [userInput, setUserInput] = useState("");

  const session: any[] = useSelector((state: any) => {
    return state;
  });

  const dispatch = useDispatch();
  console.log(session, "session");
  const messages = useMemo(() => {
    // console.log(userInput.length);
    return session.concat(
      userInput.length > 0
        ? { role: "user", content: userInput }
        : [{ role: "user", content: "....." }]
    );
  }, [session,userInput]);
  console.log(messages);
  const doSubmit = (userInput: string) => {
    if (userInput.trim() === "") return;
    dispatch(asyncAdd(messages));
  };
  const onInput = (text: string) => {
    setUserInput(text);
  };
  const measure = () => {};
  useEffect(() => {}, [userInput]);

  return (
    <div className={styles.chat}>
      <div className={styles["chat-body"]}>
        {messages.map((message, i) => {
          const isUser = message.role === "user";
          return (
            <Fragment>
              <div
                className={
                  isUser ? styles["chat-message-user"] : styles["chat-message"]
                }
              >
                <div className={styles["chat-message-container"]}>
                  <div className={styles["chat-message-header"]}>
                    <div className={styles["chat-message-avatar"]}>
                      {isUser ? <Avatar>GPT</Avatar> : <Avatar />}
                    </div>
                  </div>
                  <div className={styles["chat-message-item"]}>
                    <ReactMarkdown
                      remarkPlugins={[RemarkMath, RemarkGfm]}
                      rehypePlugins={[
                        RehypeKatex,
                        [
                          RehypeHighlight,
                          {
                            detect: false,
                            ignoreMissing: true,
                          },
                        ],
                      ]}
                      components={{
                        pre: PreCode,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className={styles["chat-input-panel"]}>
        <label className={styles["chat-input-panel-inner"]}>
          <textarea
            value={userInput}
            className={styles["chat-input"]}
            onInput={(e) => onInput(e.currentTarget.value)}
          ></textarea>
          <Button variant="contained" onClick={() => doSubmit(userInput)}>
            确定
          </Button>
        </label>
      </div>
    </div>
  );
}

export function PreCode(props: { children: any }) {
  return (
    <>
      <pre>{props.children}</pre>
    </>
  );
}
