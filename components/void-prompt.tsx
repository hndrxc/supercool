"use client";

import Form from "next/form";
import { useFormStatus } from "react-dom";

type VoidPromptProps = { maxLength: number; query?: string; error?: string };

function VoidField({ maxLength, query, error }: VoidPromptProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <input
        id="void-query"
        name="q"
        type="search"
        enterKeyHint="go"
        autoComplete="off"
        autoFocus
        required
        minLength={2}
        maxLength={maxLength}
        defaultValue={query}
        readOnly={pending}
        placeholder="where are you?"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "void-error" : undefined}
        className={`w-full border border-white/60 bg-transparent px-4 py-3 text-center font-mono text-xl text-white caret-white outline-none placeholder:text-white/40 focus-visible:border-white focus-visible:shadow-[0_0_28px_rgb(255_255_255/0.3)] [&::-webkit-search-cancel-button]:appearance-none ${pending ? "void-collapse" : ""}`}
      />
      <button type="submit" className="sr-only">
        Detonate forecast
      </button>
      {pending ? (
        <span aria-hidden className="void-singularity absolute inset-0 m-auto block h-2 w-2 rounded-full bg-white" />
      ) : null}
      <p role="status" className="sr-only">
        {pending ? "Detonating forecast…" : ""}
      </p>
      {error && !pending ? (
        <p id="void-error" role="alert" className="absolute inset-x-0 top-full mt-4 text-center font-mono text-xs text-[#ff7aa8]">
          {error}
        </p>
      ) : null}
    </>
  );
}

/** The whole landing page: one text box in a black void. */
export function VoidPrompt(props: VoidPromptProps) {
  return (
    <main className="grid min-h-dvh place-items-center bg-black px-6">
      <h1 className="sr-only">WEATHER.EXE</h1>
      <Form action="/" className="relative w-full max-w-md">
        <label htmlFor="void-query" className="sr-only">
          Location: a U.S. place or ZIP code
        </label>
        <VoidField {...props} />
      </Form>
    </main>
  );
}
