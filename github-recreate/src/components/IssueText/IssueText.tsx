import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

interface Content {
  title: string;
  body: string;
  data?: [];
}
interface Data {
  data?: [];
}

export function IssueText({ data }: Data) {
  const [visible, setVisible] = useState(false);

  function test() {
    setVisible(!visible);
  }

  return data?.map((i: Content, index: number) => {
    return (
      <button onClick={() => setVisible(!visible)} key={index}>
        <ReactMarkdown children={i.title} remarkPlugins={[remarkGfm]} />
        {visible && (
          <ReactMarkdown children={i.body} remarkPlugins={[remarkGfm]} />
        )}
      </button>
    );
  });
}
