import type { Block } from '../../types/content';

export const typescriptAdvanced: Block[] = [
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "Type Branding + Nominal Typing",
            "items": [
              "<b>Branding pattern:</b> type USD = number & { _brand: 'USD' }. Brand prevents accidental interchange of similar types.",
              "<b>Nominal typing:</b> class implements Brand&lt;'Email'&gt;. Runtime check + compile-time uniqueness.",
              "<b>Type predicates:</b> function isDog(x: Animal | Dog): x is Dog { return 'bark' in x; }. Narrow union in if blocks.",
              "<b>User-defined type guards:</b> 'pet is Fish'. Guard string for 'Fish' | 'Bird'. Less common but valid.",
              "<b>Polymorphic this:</b> class Chain { chain(): this { return this; } }. Fluent API preserves exact type."
            ]
          },
          {
            "heading": "Template Literal Types",
            "items": [
              "<b>String pattern matching:</b> `Query${string | number}` - prefix + any string/number. `user.${'id'|'name'}` for specific patterns.",
              "<b>Dynamic route types:</b> '/users/:id' → extract ID param. Combine with keyof for route parameter safety.",
              "<b>SQL query typing:</b> template literals for query strings with interpolated parameters. Runtime validation still needed.",
              "<b>CSS-in-TS:</b> template literals for class names with style property validation. clsx typed with CSS properties."
            ]
          }
        ],
        "traps": [
          "Branding is erased at runtime — still need runtime validation for external data",
          "Template literal types hit recursion limit with complex patterns",
          "Polymorphic this doesn't work with arrow methods — loses 'this' binding"
        ],
        "checkpoint": [
          "Design a branded type for Email that prevents passing raw strings to functions expecting Email.",
          "How do you use template literal types to create a type-safe SQL query builder?",
          "What is 'in' keyword used for in type guards and lookups?"
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
        "level": "Advanced",
        "time": "30 min",
        "sections": [
          {
            "heading": "React Props",
            "items": [
              "<b>Props type:</b> function Button(props: ButtonProps) or function Button({ variant }: ButtonProps).",
              "<b>children:</b> type explicitly when needed; React 18 no longer requires React.FC for children.",
              "<b>Polymorphic components:</b> as prop with component generics when API truly needs it.",
              "<b>Event types:</b> React.ChangeEvent<HTMLInputElement>, React.FormEvent<HTMLFormElement>."
            ]
          },
          {
            "heading": "Advanced Patterns",
            "items": [
              "<b>Branding:</b> type Email = string & { readonly brand: unique symbol } for nominal safety.",
              "<b>Template literals:</b> type Route = `/users/${string}` for constrained strings.",
              "<b>Conditional types:</b> Extract, Exclude, and custom conditional mappings.",
              "<b>tsconfig:</b> strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes improve safety."
            ]
          }
        ],
        "traps": [
          "Polymorphic components can make prop types hard to maintain",
          "Branding is compile-time only; validate runtime data separately",
          "Strict tsconfig options reveal real bugs but may require migration"
        ],
        "checkpoint": [
          "Type a reusable Button component.",
          "How do you brand an Email type?",
          "Which tsconfig strict options improve safety most?"
        ]
      }
    ],
    "grill": "You are a Senior TypeScript Engineer interviewing a candidate.\n\nTOPIC: TypeScript Practical Usage (Block 87)\n\nYOUR ROLE: Reactive Socratic interviewer.\n\nAPPROACH: Practical TS usage, narrowing, generics, API validation, React props. 'Type this API response', 'interface vs type', 'generic constraints'.\n\nRULES: One question. React. 6–8 exchanges. PASS/BORDERLINE/FAIL.\n\nBEGIN."
  }
];

export default typescriptAdvanced;
