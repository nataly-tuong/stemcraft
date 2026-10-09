import React from "react";

export default function Main() {
  const [flowers, setFlowers] = React.useState([]);

  const [arrangementShown, setArrangementShown] = React.useState(false);

  function toggleArrangementShown() {
    setArrangementShown((prevShown) => !prevShown);
  }

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
        <section className="px-6">
          <h2 className="font-bold text-xl mb-5">Flowers on hand:</h2>
          <ul className="list-disc pl-10 mb-5" aria-live="polite">
            {flowersListItems}
          </ul>
          {flowers.length > 3 && (
            <div className="bg-white border-solid border-2 border-moss rounded-lg p-4 flex gap-4 w-full items-center justify-between">
              <div>
                <h3 className="font-bold mb-2">Ready for a bouquet?</h3>
                <p>Generate an arrangement from your list of flowers.</p>
              </div>
              <button
                onClick={toggleArrangementShown}
                className="hover:opacity-80 font-medium bg-moss px-4 py-2 text-moss-light rounded-lg"
              >
                Get an arrangement
              </button>
            </div>
          )}
        </section>
      ) : null}

      {arrangementShown && (
        <section className="px-6 flex flex-col gap-3">
          <h2 className="font-bold">Stemcraft Arrangement Suggestion:</h2>
          <p>
            Based on the flowers you have on hand, here is a suggested bouquet
            arrangement you can put together:
          </p>
          <strong>Ingredients:</strong>
          <ul className="list-disc pl-10">
            <li>3-5 stems focal blooms (e.g., peonies, garden roses)</li>
            <li>4-6 stems secondary flowers (e.g., ranunculus, carnations)</li>
            <li>
              5-7 stems airy filler or line flowers (e.g., lavender,
              snapdragons, delphinium)
            </li>
            <li>
              3-4 stems textured accents (e.g., small sunflowers, chamomile,
              thistle)
            </li>
            <li>Generous foliage or greenery (e.g., eucalyptus, ruscus)</li>
            <li>Floral tape or natural twine</li>
            <li>Clean vase filled with cool water and flower food</li>
          </ul>
          <strong>Instructions:</strong>
          <ol className="list-decimal pl-10">
            <li>
              Trim all stems at a 45-degree angle under running water, removing
              any leaves that sit below the waterline.
            </li>
            <li>
              Start by creating a crisscross foliage grid in your vase to build
              a supportive foundation for the blooms.
            </li>
            <li>
              Place your largest focal flowers (like peonies) at varied heights,
              clustering slightly off-center for visual balance.
            </li>
            <li>
              Layer in secondary flowers around the focal points, rotating the
              vase to ensure color balance on all sides.
            </li>
            <li>
              Weave airy fillers and line flowers (like lavender) higher up and
              through gaps to add height, motion, and texture.
            </li>
            <li>
              Tuck accent blooms into open pockets, ensuring blooms face outward
              at gentle angles rather than straight up.
            </li>
            <li>
              Step back, adjust spacing to avoid crowding, and top off the vase
              with fresh cool water daily.
            </li>
          </ol>
        </section>
      )}
    </main>
  );
}
