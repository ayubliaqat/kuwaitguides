"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  List,
  ListOrdered,
  Quote,
  Code2,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
  Table as TableIcon,
  Undo2,
  Redo2,
  ChevronDown,
  Loader2,
} from "lucide-react";

function Divider() {
  return <div className="w-px h-5 bg-border mx-1.5 flex-shrink-0" />;
}

export default function TiptapEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  // All hooks declared up top, unconditionally
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const tableMenuRef = useRef<HTMLDivElement>(null);
  const blockMenuRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing…" }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Subscript,
      Superscript,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[350px] px-4 py-3 outline-none prose prose-lg max-w-none " +
          "prose-h1:text-[2.25rem] prose-h1:font-semibold prose-h1:leading-[1.2] prose-h1:my-6 " +
          "prose-h2:text-[1.875rem] prose-h2:font-semibold prose-h2:leading-[1.3] prose-h2:my-5 " +
          "prose-h3:text-[1.5rem] prose-h3:font-semibold prose-h3:leading-[1.35] prose-h3:my-4 " +
          "prose-h4:text-[1.25rem] prose-h4:font-semibold prose-h4:leading-[1.4] prose-h4:my-4 " +
          "prose-h5:text-[1.125rem] prose-h5:font-semibold prose-h5:leading-[1.4] prose-h5:my-3 " +
          "prose-h6:text-[1rem] prose-h6:font-semibold prose-h6:leading-[1.4] prose-h6:my-3",
      },
    },
  });

  // Close dropdowns when clicking outside them
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (tableMenuRef.current && !tableMenuRef.current.contains(e.target as Node)) {
        setShowTableMenu(false);
      }
      if (blockMenuRef.current && !blockMenuRef.current.contains(e.target as Node)) {
        setShowBlockMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!editor) return null;

  const blockOptions = [
    { label: "Paragraph", value: "paragraph" },
    { label: "Heading 1", value: "h1" },
    { label: "Heading 2", value: "h2" },
    { label: "Heading 3", value: "h3" },
    { label: "Heading 4", value: "h4" },
    { label: "Heading 5", value: "h5" },
    { label: "Heading 6", value: "h6" },
  ];

  function getCurrentBlock() {
    for (let level = 1; level <= 6; level++) {
      if (editor!.isActive("heading", { level })) return `h${level}`;
    }
    return "paragraph";
  }

  function setBlock(value: string) {
    if (value === "paragraph") {
      editor!.chain().focus().setParagraph().run();
    } else {
      const level = Number(value.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6;
      editor!.chain().focus().toggleHeading({ level }).run();
    }
    setShowBlockMenu(false);
  }

  function setLink() {
    const url = window.prompt("URL");
    if (url) editor!.chain().focus().setLink({ href: url }).run();
  }

  async function handleImageFile(file: File) {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        editor!.chain().focus().setImage({ src: data.url }).run();
      }
    } finally {
      setUploadingImage(false);
    }
  }

  const iconBtn = (active: boolean, disabled = false) =>
    `w-8 h-8 flex items-center justify-center rounded-[6px] transition ${
      disabled
        ? "text-text-muted/30 cursor-not-allowed"
        : active
        ? "bg-brand text-white"
        : "text-text hover:bg-white"
    }`;

  const inTable = editor.isActive("table");
  const currentBlockLabel =
    blockOptions.find((o) => o.value === getCurrentBlock())?.label ?? "Paragraph";

  return (
    <div className="rounded-[10px] border border-border bg-white overflow-visible">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-surface px-2 py-2">
        {/* Block type dropdown (matches icon button chrome) */}
        <div className="relative" ref={blockMenuRef}>
          <button
            type="button"
            onClick={() => setShowBlockMenu((s) => !s)}
            className="h-8 flex items-center gap-1.5 rounded-[6px] px-2.5 text-sm text-text hover:bg-white transition"
          >
            {currentBlockLabel}
            <ChevronDown size={14} className="text-text-muted" />
          </button>
          {showBlockMenu && (
            <div className="absolute z-20 top-9 left-0 w-40 rounded-[10px] border border-border bg-white shadow-lg py-1">
              {blockOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBlock(opt.value)}
                  className={`w-full text-left px-3 py-1.5 text-sm hover:bg-surface ${
                    getCurrentBlock() === opt.value ? "text-brand font-medium" : "text-text"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Divider />

        {/* Text formatting */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={iconBtn(editor.isActive("bold"))} title="Bold">
          <Bold size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={iconBtn(editor.isActive("italic"))} title="Italic">
          <Italic size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={iconBtn(editor.isActive("underline"))} title="Underline">
          <UnderlineIcon size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={iconBtn(editor.isActive("strike"))} title="Strikethrough">
          <Strikethrough size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleSubscript().run()} className={iconBtn(editor.isActive("subscript"))} title="Subscript">
          <SubscriptIcon size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={iconBtn(editor.isActive("superscript"))} title="Superscript">
          <SuperscriptIcon size={16} />
        </button>

        <Divider />

        {/* Blocks */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={iconBtn(editor.isActive("bulletList"))} title="Bullet list">
          <List size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={iconBtn(editor.isActive("orderedList"))} title="Numbered list">
          <ListOrdered size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={iconBtn(editor.isActive("blockquote"))} title="Quote">
          <Quote size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={iconBtn(editor.isActive("codeBlock"))} title="Code block">
          <Code2 size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={iconBtn(false)} title="Horizontal rule">
          <Minus size={16} />
        </button>

        <Divider />

        {/* Alignment */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={iconBtn(editor.isActive({ textAlign: "left" }))} title="Align left">
          <AlignLeft size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={iconBtn(editor.isActive({ textAlign: "center" }))} title="Align center">
          <AlignCenter size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={iconBtn(editor.isActive({ textAlign: "right" }))} title="Align right">
          <AlignRight size={16} />
        </button>

        <Divider />

        {/* Insert */}
        <button type="button" onClick={setLink} className={iconBtn(editor.isActive("link"))} title="Insert link">
          <Link2 size={16} />
        </button>

        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className={iconBtn(false, uploadingImage)}
          title="Insert image"
          disabled={uploadingImage}
        >
          {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageFile(file);
            e.target.value = "";
          }}
        />

        {/* Table dropdown */}
        <div className="relative" ref={tableMenuRef}>
          <button
            type="button"
            onClick={() => setShowTableMenu((s) => !s)}
            className={iconBtn(inTable)}
            title="Table"
          >
            <TableIcon size={16} />
          </button>
          {showTableMenu && (
            <div className="absolute z-20 top-9 left-0 w-52 rounded-[10px] border border-border bg-white shadow-lg py-1 max-h-80 overflow-y-auto">
              {!inTable ? (
                <button
                  type="button"
                  onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                  className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface"
                >
                  Insert table
                </button>
              ) : (
                <>
                  <div className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-text-muted">Columns</div>
                  <button type="button" onClick={() => editor.chain().focus().addColumnBefore().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Add column before</button>
                  <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Add column after</button>
                  <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-surface">Delete column</button>

                  <div className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-text-muted">Rows</div>
                  <button type="button" onClick={() => editor.chain().focus().addRowBefore().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Add row before</button>
                  <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Add row after</button>
                  <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-surface">Delete row</button>

                  <div className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-text-muted">Cells</div>
                  <button type="button" onClick={() => editor.chain().focus().mergeCells().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Merge cells</button>
                  <button type="button" onClick={() => editor.chain().focus().splitCell().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Split cell</button>
                  <button type="button" onClick={() => editor.chain().focus().toggleHeaderRow().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Toggle header row</button>
                  <button type="button" onClick={() => editor.chain().focus().toggleHeaderColumn().run()} className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface">Toggle header column</button>

                  <div className="border-t border-border mt-1 pt-1">
                    <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-surface">Delete table</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <Divider />

        {/* History */}
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={iconBtn(false)} title="Undo">
          <Undo2 size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={iconBtn(false)} title="Redo">
          <Redo2 size={16} />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}