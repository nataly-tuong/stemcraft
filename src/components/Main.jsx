export default function Main() {
  function handleClick() {
    console.log("I was clicked!");
  }

  return (
    <main>
      <form className="max-w-md w-full mx-auto flex rounded-lg border-2 border-moss overflow-hidden">
        <input
          aria-label="Add a flower"
          type="text"
          placeholder="e.g. peony"
          className="flex-1 px-4 py-2 outline-none bg-white text-moss placeholder:text-gray-400"
        />
        <button
          onClick={handleClick}
          type="submit"
          className="bg-moss before:content-['+'] before:mr-2
          text-moss-light px-5 py-2 font-medium hover:opacity-90"
          Add
          flower
        ></button>
      </form>
    </main>
  );
}
