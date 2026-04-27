<!-- BEGIN:global-agent-rules -->
# DevStash
A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

# Agent Operating Context

This project uses a structured memory system.  
You MUST load and respect all referenced files before generating code or making decisions.

## Context Priority Order
Read the following to get the full context of the project

1. @memory-bank/active-context.md (highest priority)
2. @memory-bank/current-feature.md
3. @memory-bank/decisions.md
4. @memory-bank/architecture.md
5. @memory-bank/coding-standards.md
6. tech@memory-bank/-stack.md
7. @memory-bank/ai-interaction.md
8. @memory-bank/progress.md
9. project@memory-bank/-overview.md
10. @memory-bank/memory-bank.md (lowest priority)

## Primary Context Source (Memory Bank)

@memory-bank/active-context.md  
→ Current state of the application, what is being worked on now

@memory-bank/current-feature.md  
→ Exact feature currently being implemented (scope, requirements, constraints)

@memory-bank/architecture.md  
→ System design, folder structure, component relationships

@memory-bank/tech-stack.md  
→ Technologies in use (React, state management, APIs, etc.)

@memory-bank/coding-standards.md  
→ Coding rules, patterns, naming conventions, best practices (STRICT)

@memory-bank/decisions.md  
→ Architectural and technical decisions already made (DO NOT contradict)

@memory-bank/ai-interaction.md  
→ How the AI should behave, respond, and collaborate within this project

@memory-bank/progress.md  
→ What has already been built / completed

@memory-bank/project-overview.md  
→ High-level understanding of the product, goals, and domain

@memory-bank/memory-bank.md  
→ General long-term knowledge and project notes

---

## Rules for the Agent

1. Treat memory-bank as the single source of truth
2. Never ignore any referenced memory files
3. Do not reinvent architecture already defined
4. Stay consistent with decisions.md at all times
5. Follow coding-standards.md strictly
6. Use active-context.md and current-feature.md as primary drivers
7. Prefer existing patterns over new ones
8. Do not make assumptions outside memory-bank
9. If conflict occurs → follow priority order

---

## Execution Strategy

Before writing code:

1. Read ALL memory-bank files
2. Build internal understanding of:
   - current state
   - feature scope
   - constraints
   - architecture
   - standards
3. Validate approach against decisions.md
4. Then proceed with implementation

---

## Failure Prevention Rules

- If required context is missing → STOP and ask
- If solution conflicts with memory-bank → REJECT solution
- If unsure → derive ONLY from memory-bank, never from generic knowledge

---

<!-- END:global-agent-rules -->