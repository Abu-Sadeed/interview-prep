import type { Block } from '../../types/content';

export const typescriptIntermediate: Block[] = [
  {
    "id": "typescript-1",
    "phase": "JS Backend",
    "chip": "ts",
    "freq": "high",
    "title": "TypeScript — Advanced Type System",
    "subtitle": "Conditional types, mapped types, generic constraints, type inference, utility types, branding",
    "prereqs": [
      "javascript-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "40 min",
        "sections": [
          {
            "heading": "Conditional Types + infer",
            "items": [
              "<b>infer keyword:</b> T extends (...args: any) => infer R ? R : never. Extract return type, parameter types, element type.",
              "<b>Distributive conditional types:</b> T extends U ? X : Y distributes over union. Wrap in [] to prevent distribution.",
              "<b>Exclude vs Omit:</b> Exclude removes from union. Omit removes property keys then remaps. Exclude 'a'|'b'|'c' = 'b'|'c'.",
              "<b>Template literal types:</b> `Hello ${Capitalize&lt;Lowercase&lt;T&gt;&gt;}` - string manipulation at type level. Uppercase, Lowercase, Capitalize, Uncapitalize.",
              "<b>Recursive types:</b> Tree&lt;T&gt; = { value: T; children: Tree&lt;T&gt;[] }. Natural for data structures, risky for deeply nested."
            ]
          },
          {
            "heading": "Mapped Types + Key Remapping",
            "items": [
              "<b>Key remapping (TS 4.1+):</b> type Getters&lt;T&gt; = { [K in keyof T as `get${Capitalize&lt;string & K&gt;`]: () => T[K] }.",
              "<b>Conditional modifiers:</b> Remove readonly/optional with - modifier. Add with + modifier.",
              "<b>Filtering keys:</b> { [K in keyof T as T[K] extends Function ? K : never]: T[K] } - extract method keys only.",
              "<b>Generic constraints:</b> &lt;T extends Record&lt;string, any&gt;&gt; ensures object type. &lt;T extends { id: string }&gt; for specific shape."
            ]
          }
        ],
        "traps": [
          "Conditional types distribute over unions by default — wrap in [] to prevent unwanted behavior",
          "Key remapping with Capitalize requires string & K to avoid union keys",
          "Recursive types hit infinite expansion limit — add depth constraint with conditional type"
        ],
        "checkpoint": [
          "Write a mapped type that converts all properties to functions returning that type.",
          "Implement a type that extracts function names from an object type.",
          "What does 'distributive conditional types' mean? Give an example."
        ]
      }
    ],
    "grill": "You are a Senior TypeScript Engineer interviewing a candidate.\n\nTOPIC: TypeScript Advanced Type System (Block 64)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Type system puzzles, conditional type challenges, branding patterns. 'Design a type-safe builder', 'why won't this type constraint work', 'branding for safety'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  },
  {
    "id": "typescript-2",
    "phase": "JavaScript",
    "chip": "ts",
    "freq": "high",
    "title": "TypeScript Practical Usage",
    "subtitle": "Interfaces vs types, narrowing, generics basics, API response typing, React props",
    "prereqs": [
      "javascript-2"
    ],
    "tiers": [
      {
        "level": "Intermediate",
        "time": "35 min",
        "sections": [
          {
            "heading": "Generics Basics",
            "items": [
              "<b>Generic function:</b> function identity<T>(value: T): T { return value; }.",
              "<b>Constraints:</b> <T extends { id: string }> limits accepted types.",
              "<b>Utility types:</b> Partial, Pick, Omit, Record, Readonly, ReturnType.",
              "<b>Inference:</b> let TypeScript infer when explicit annotations add noise."
            ]
          },
          {
            "heading": "API Responses",
            "items": [
              "<b>Runtime validation:</b> use Zod or similar to validate external data, then narrow to TypeScript types.",
              "<b>z.infer:</b> derive static type from runtime schema to avoid duplication.",
              "<b>Error unions:</b> type success and failure responses explicitly.",
              "<b>Serialization:</b> TypeScript types do not validate JSON from the network."
            ]
          }
        ],
        "traps": [
          "Generics are for relationships between inputs/outputs, not just any reusable function",
          "Type inference from API responses is unsafe without runtime validation",
          "Over-constraining generics makes them hard to reuse"
        ],
        "checkpoint": [
          "Write a generic map function.",
          "How do you type and validate an API response?",
          "When should you avoid explicit generic annotations?"
        ]
      }
    ],
    "grill": "You are a Senior TypeScript Engineer interviewing a candidate.\n\nTOPIC: TypeScript Practical Usage (Block 87)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical TS usage, narrowing, generics, API validation, React props. 'Type this API response', 'interface vs type', 'generic constraints'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default typescriptIntermediate;
