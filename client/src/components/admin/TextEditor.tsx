import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ text, setText }) => {
  return <ReactQuill theme="snow" value={text} onChange={setText} />;
};

export default TextEditor;
