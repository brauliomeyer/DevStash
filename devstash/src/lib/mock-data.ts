// Single source of truth for dashboard mock data.
// This file is intentionally plain: data + types only, no helper methods.
// It will be replaced by real database-backed data later.

export type ItemType =
  | "SNIPPET"
  | "COMMAND"
  | "PROMPT"
  | "NOTE"
  | "FILE"
  | "LINK"
  | "CUSTOM";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
}

export interface Item {
  id: string;
  title: string;
  content: string;
  type: ItemType;
  tags: string[];
  collectionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ItemTypeInfo {
  type: ItemType;
  label: string;
}

export const currentUser: User = {
  id: "user-1",
  name: "Jordan Lee",
  email: "jordan.lee@example.com",
};

export const itemTypes: ItemTypeInfo[] = [
  { type: "SNIPPET", label: "Snippet" },
  { type: "COMMAND", label: "Command" },
  { type: "PROMPT", label: "Prompt" },
  { type: "NOTE", label: "Note" },
  { type: "FILE", label: "File" },
  { type: "LINK", label: "Link" },
  { type: "CUSTOM", label: "Custom" },
];

export const collections: Collection[] = [
  {
    id: "col-react",
    name: "React Patterns",
    description: "Reusable components and hooks",
  },
  {
    id: "col-terminal",
    name: "Terminal Commands",
    description: "Shell, git, and CLI one-liners",
  },
  {
    id: "col-prompts",
    name: "AI Prompts",
    description: "Prompt templates for LLM workflows",
  },
  {
    id: "col-notes",
    name: "Project Notes",
    description: "Implementation notes and decisions",
  },
];

export const items: Item[] = [
  {
    id: "item-1",
    title: "useDebounce hook",
    type: "SNIPPET",
    collectionId: "col-react",
    tags: ["react", "hooks"],
    content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    createdAt: "2026-08-01T09:00:00.000Z",
    updatedAt: "2026-08-10T14:30:00.000Z",
  },
  {
    id: "item-2",
    title: "useLocalStorage hook",
    type: "SNIPPET",
    collectionId: "col-react",
    tags: ["react", "hooks", "storage"],
    content: `import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    createdAt: "2026-08-03T10:15:00.000Z",
    updatedAt: "2026-08-12T08:45:00.000Z",
  },
  {
    id: "item-3",
    title: "Squash last 3 commits",
    type: "COMMAND",
    collectionId: "col-terminal",
    tags: ["git", "terminal"],
    content: `git rebase -i HEAD~3
# mark the commits you want to squash with "s"`,
    createdAt: "2026-08-05T11:00:00.000Z",
    updatedAt: "2026-08-05T11:00:00.000Z",
  },
  {
    id: "item-4",
    title: "Find files over 10MB",
    type: "COMMAND",
    collectionId: "col-terminal",
    tags: ["shell", "linux", "cli"],
    content: `find . -type f -size +10M -exec ls -lh {} \\; | awk '{ print $5, $9 }'`,
    createdAt: "2026-08-07T16:20:00.000Z",
    updatedAt: "2026-08-07T16:20:00.000Z",
  },
  {
    id: "item-5",
    title: "Code review prompt",
    type: "PROMPT",
    collectionId: "col-prompts",
    tags: ["code-review", "llm"],
    content: `You are a senior engineer reviewing code. For the diff below:
- Identify bugs, security issues, and edge cases.
- Suggest concrete fixes with code examples.
- Highlight readability and performance improvements.
- Summarize the top 5 issues in priority order.`,
    createdAt: "2026-08-09T12:00:00.000Z",
    updatedAt: "2026-08-11T09:30:00.000Z",
  },
  {
    id: "item-6",
    title: "PR summary prompt",
    type: "PROMPT",
    collectionId: "col-prompts",
    tags: ["changelog", "llm", "git"],
    content: `Summarize this pull request for a changelog. Include:
- A one-line headline.
- Key changes as bullet points.
- Breaking changes (if any).
- A suggested version bump (patch/minor/major).`,
    createdAt: "2026-08-10T13:45:00.000Z",
    updatedAt: "2026-08-10T13:45:00.000Z",
  },
  {
    id: "item-7",
    title: "Auth refactor plan",
    type: "NOTE",
    collectionId: "col-notes",
    tags: ["auth", "planning", "refactor"],
    content: `Refactor authentication to use a single session service:
1. Move token refresh out of the API client.
2. Add a SessionProvider at the app root.
3. Replace ad-hoc localStorage reads with the shared hook.
4. Add tests for expired-token recovery.`,
    createdAt: "2026-08-12T09:00:00.000Z",
    updatedAt: "2026-08-18T15:10:00.000Z",
  },
  {
    id: "item-8",
    title: "DB schema decisions",
    type: "NOTE",
    collectionId: "col-notes",
    tags: ["database", "decisions", "architecture"],
    content: `- Item is the central entity; every asset has a type.
- Tags are workspace-scoped to avoid cross-tenant conflicts.
- Collections are optional grouping containers.
- Metadata stays as JSON until custom types are stable.`,
    createdAt: "2026-08-14T10:30:00.000Z",
    updatedAt: "2026-08-14T10:30:00.000Z",
  },
  {
    id: "item-9",
    title: "React hooks reference",
    type: "LINK",
    collectionId: "col-react",
    tags: ["react", "reference", "docs"],
    content: "https://react.dev/reference/react/hooks",
    createdAt: "2026-08-15T08:00:00.000Z",
    updatedAt: "2026-08-15T08:00:00.000Z",
  },
  {
    id: "item-10",
    title: "Next.js docs",
    type: "LINK",
    collectionId: null,
    tags: ["nextjs", "reference", "docs"],
    content: "https://nextjs.org/docs",
    createdAt: "2026-08-16T09:20:00.000Z",
    updatedAt: "2026-08-16T09:20:00.000Z",
  },
  {
    id: "item-11",
    title: "DevStash API Postman collection",
    type: "FILE",
    collectionId: null,
    tags: ["api", "postman", "testing"],
    content: "devstash-api.postman_collection.json",
    createdAt: "2026-08-17T14:00:00.000Z",
    updatedAt: "2026-08-17T14:00:00.000Z",
  },
  {
    id: "item-12",
    title: "Sprint 15 checklist",
    type: "CUSTOM",
    collectionId: "col-notes",
    tags: ["sprint", "checklist"],
    content: `- [ ] Ship item CRUD endpoints
- [ ] Add collection filters to dashboard
- [ ] Write tag search tests
- [ ] Review accessibility of item cards`,
    createdAt: "2026-08-19T11:30:00.000Z",
    updatedAt: "2026-08-19T11:30:00.000Z",
  },
];
