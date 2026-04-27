<!-- BEGIN:global-agent-rules -->

# Agent Operating Context

This project uses a structured memory system.  
You MUST load and respect all referenced files before generating code or making decisions.

## Primary Context Source (Memory Bank)

@memory-bank/active-context.md  
→ Current state of the application, what is being worked on now

@memory-bank/architecture.md  
→ System design, folder structure, component relationships

@memory-bank/tech-stack.md  
→ Technologies in use (React, state management, APIs, etc.)

@memory-bank/decisions.md  
→ Architectural and technical decisions already made (DO NOT contradict)

@memory-bank/progress.md  
→ What has already been built / completed

@memory-bank/memory-bank.md  
→ General long-term knowledge and project notes

---

## Rules for the Agent

1. Never ignore the memory-bank files
2. Do not reinvent architecture already defined
3. Stay consistent with decisions.md
4. Use active-context.md as the highest priority
5. Prefer existing patterns over new ones
6. If something is unclear → infer ONLY from memory-bank, not assumptions

---

## Execution Strategy

Before writing code:

1. Read ALL memory-bank files
2. Build internal understanding of:
   - current state
   - constraints
   - architecture
3. Then proceed with implementation

---

<!-- END:global-agent-rules -->