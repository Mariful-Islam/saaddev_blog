import React, {useState} from 'react'
import {createEditor} from "slate";
import {Slate, Editable, withReact} from "slate-react";

const Post = () => {
  const initialValue = [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ]
  const [editor] = useState(()=> withReact(createEditor()))
  return (
      <Slate editor={editor} initialValue={initialValue}>
        <Editable />
      </Slate>

  )
}

export default Post