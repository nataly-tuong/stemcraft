export default function Main() {
  return (
    <main>
      <form className="max-w-sm w-full mx-auto flex rounded-md border-2 border-moss overflow-hidden">
        <input
          aria-label="Add a flower"
          type="text"
          placeholder="e.g. peony"
          className="flex-1 px-4 py-2 outline-none bg-white text-moss placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-moss text-moss-light px-5 py-2 font-medium hover:opacity-90 transition"
        >
          + Add flower
        </button>
      </form>
    </main>
  );
}
