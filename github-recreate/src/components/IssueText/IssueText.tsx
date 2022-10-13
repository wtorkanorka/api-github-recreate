import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

import cx from "classnames";
import styles from "./Issue.module.scss";

interface data {
  dataElem: {};
}
interface content {
  title: string;
  body: string;
}

export function IssueText({ dataElem }: data) {
  const [visible, setVisible] = useState(false);
  console.log(dataElem);
  return (
    <button onClick={() => setVisible(!visible)}>
      <div className={cx(visible && styles["border-title"])}>
        <ReactMarkdown children={dataElem.title} remarkPlugins={[remarkGfm]} />
      </div>
      {visible && (
        <ReactMarkdown children={dataElem.body} remarkPlugins={[remarkGfm]} />
      )}
    </button>
  );
}
