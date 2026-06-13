import type { Block } from '../types/content';

export const typescriptContent: Block[] = [
  {
    "id": 64,
    "phase": "JS Backend",
    "chip": "ts",
    "freq": "high",
    "title": "TypeScript — Advanced Type System",
    "subtitle": "Conditional types, mapped types, generic constraints, type inference, utility types, branding",
    "prereqs": [
      65
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
      },
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
      },
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
    "id": 87,
    "phase": "JavaScript",
    "chip": "ts",
    "freq": "high",
    "title": "TypeScript Practical Usage",
    "subtitle": "Interfaces vs types, narrowing, generics basics, API response typing, React props",
    "prereqs": [
      65
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
      },
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
      },
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

export default typescriptContent;
