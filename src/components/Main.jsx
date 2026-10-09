import React from "react";

export default function Main() {
  const [flowers, setFlowers] = React.useState([]);

  const flowersListItems = flowers.map((flower) => (
    <li key={flower}>{flower}</li>
  ));

  function handleClick() {
    console.log("I was clicked!");
  }

  function addFlower(formData) {
    const newFlower = formData.get("flower");
    setFlowers((prevFlowers) => [...prevFlowers, newFlower]);
  }

  return (
    <main className="flex flex-col gap-3">
      <form
        action={addFlower}
        className="max-w-md w-full mx-auto flex rounded-lg border-2 border-moss overflow-hidden"
      >
        <input
          name="flower"
          aria-label="Add a flower"
          type="text"
          placeholder="e.g. peony"
          className="flex-1 text-black px-4 py-2 outline-none bg-white  placeholder:text-gray-400"
        />
        <button
          onClick={handleClick}
          type="submit"
          className="bg-moss before:content-['+'] before:mr-2
          text-moss-light px-5 py-2 font-medium hover:opacity-90"
        >
          Add flower
        </button>
      </form>
      {flowers.length > 0 ? (
        <section className="px-4">
          <h2 className="font-bold text-xl mb-5">Flowers on hand:</h2>
          <ul className="list-disc pl-10 mb-5" aria-live="polite">
            {flowersListItems}
          </ul>
          <div className="bg-white border-solid border-2 border-moss rounded-lg p-4 flex gap-4 w-full items-center justify-between">
            <div>
              <h3 className="font-bold mb-2">Ready for a bouquet?</h3>
              <p>Generate an arrangement from your list of flowers.</p>
            </div>
            <button className="hover:opacity-80 bg-moss px-4 py-2 text-moss-light rounded-lg">
              Get an arrangement
            </button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
