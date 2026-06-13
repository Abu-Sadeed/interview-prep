import type { Block } from '../../types/content';

export const typescriptBeginner: Block[] = [
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "TypeScript Utility Types Deep Dive",
            "items": [
              "<b>Readonly&lt;T&gt;:</b> makes all properties readonly. Use for immutable data structures. deep: readonly nested objects.",
              "<b>Partial&lt;T&gt;:</b> all properties optional. Use for PATCH operations. Deep partial requires custom implementation.",
              "<b>Pick&lt;T, K&gt;:</b> select subset of properties. Omit&lt;T, K&gt; removes properties. Useful for DTOs.",
              "<b>Record&lt;K, T&gt;:</b> object with keys K and values T. Better than index signature with explicit key types.",
              "<b>Extract&lt;T, U&gt; and Exclude&lt;T, U&gt;:</b> set operations on union types. Extract matching, exclude matching."
            ]
          },
          {
            "heading": "Variance in TypeScript",
            "items": [
              "<b>Covariance:</b> Array&lt;Dog&gt; is Array&lt;Animal&gt; — subtype → supertype. Safe for read-only access.",
              "<b>Contravariance:</b> callback(Animal) is callback(Dog) — function accepts wider types. Function parameters are contravariant.",
              "<b>Invariance:</b> Array&lt;Dog&gt; is NOT Array&lt;Animal&gt; — mutations would break type safety. Mutable containers are invariant.",
              "<b>in operator and keyof:</b> obj[keyof obj] is union of all value types. obj[0] is T extends array ? never : T."
            ]
          }
        ],
        "traps": [
          "Readonly doesn't prevent mutation in nested objects — needs deep readonly helper",
          "Array assignment variance breaks at runtime — TypeScript only catches read-only violations at compile",
          "Record&lt;K, T&gt; with K = string is too wide — narrow to specific keys or use 'as const' for literal types"
        ],
        "checkpoint": [
          "Implement DeepPartial&lt;T&gt; that makes nested properties optional.",
          "What is the difference between Pick and Omit? When do you use each?",
          "Explain covariance vs contravariance in TypeScript with examples."
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
        "level": "Beginner",
        "time": "30 min",
        "sections": [
          {
            "heading": "Types + Interfaces",
            "items": [
              "<b>type:</b> aliases for primitives, unions, intersections, tuples, and object shapes.",
              "<b>interface:</b> named object shape. Can be extended and merged by declaration merging.",
              "<b>Prefer type for unions:</b> type UserState = Idle | Loading | Success | Error.",
              "<b>Structural typing:</b> compatibility comes from shape, not nominal class name."
            ]
          },
          {
            "heading": "Narrowing",
            "items": [
              "<b>typeof:</b> narrow string, number, boolean, bigint, symbol, object, function.",
              "<b>in:</b> check property existence before accessing it.",
              "<b>instanceof:</b> narrow class instances at runtime.",
              "<b>Type predicates:</b> function isUser(value: unknown): value is User."
            ]
          }
        ],
        "traps": [
          "interface and type are often interchangeable for object shapes",
          "any disables type checking and should be avoided",
          "Narrowing after async boundaries usually requires runtime validation"
        ],
        "checkpoint": [
          "When choose interface vs type?",
          "How do you narrow a union of API response states?",
          "Why is any dangerous?"
        ]
      }
    ],
    "grill": "You are a Senior TypeScript Engineer interviewing a candidate.\n\nTOPIC: TypeScript Practical Usage (Block 87)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical TS usage, narrowing, generics, API validation, React props. 'Type this API response', 'interface vs type', 'generic constraints'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default typescriptBeginner;
