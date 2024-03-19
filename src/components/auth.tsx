import { useEffect } from "react";
import styles from "./auth.module.scss";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";

export function Auth() {
  const navigate = useNavigate();
  const goChat = () => navigate(Path.Chat);

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["auth-title"]}>需要OpenRouter API key</div>
      <div className={styles["auth-tips"]}>输入你的OpenRouter API key</div>
      <Input
        placeholder="OpenRouter API key"
        className={styles["auth-input"]}
        type="password"
      ></Input>
      <a
        href="https://openrouter.ai/docs#quick-start"
        className={styles["auth-a"]}
        target="_blank"
      >
        获取OpenRouter API key
      </a>

      <div className={styles["auth-actions"]}>
        <Button onClick={goChat}>确定</Button>
        <div onClick={goChat}>稍后再说</div>
      </div>
    </div>
  );
}
