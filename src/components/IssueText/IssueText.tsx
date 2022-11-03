import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

import cx from "classnames";
import styles from "./Issue.module.scss";

interface Data {
  dataElem: {
    title: string;
    body: string;
  };
}

export function IssueText({ dataElem }: Data) {
  const [visible, setVisible] = useState(false);

  return (
    <button onClick={() => setVisible(!visible)} className={styles["style"]}>
      <div className={cx(visible && styles["border-title"])}>
        <ReactMarkdown children={dataElem.title} remarkPlugins={[remarkGfm]} />
      </div>
      {visible && (
        <ReactMarkdown children={dataElem.body} remarkPlugins={[remarkGfm]} />
      )}
    </button>
  );
}
