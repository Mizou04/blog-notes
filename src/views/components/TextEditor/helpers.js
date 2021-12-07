import { createEditor, Editor, Transforms, Text } from 'slate';
// Import the Slate components and React plugin.

export const CustomEditor = {
    isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
  
      return !!match
    },
  
    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
  
      return !!match
    },
    isItalicMarkActive(editor){
        const [match] = Editor.nodes(editor, {
            match: n=>n.type === "italic",
            universal : true,
        })
        return !!match
    }
    ,
  
    toggleBoldMark(editor) {
      const isActive = this.isBoldMarkActive(editor)
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
    },
  
    toggleCodeBlock(editor) {
      const isActive = this.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
    toggleItalicMark(editor){
        const isActive = this.isItalicMarkActive(editor);
        Transforms.setNodes(
            editor,
            {italic : isActive ? null : true},
            {match : n=> Text.isText(n), split : true}
        )
    }
    
  }