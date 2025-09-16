export default function Home() {
  return (
    <div className="w-[65%] mx-auto py-5">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <div className="sticky top-8">
            <h2 className="text-lg font-semibold">Filter</h2>
            <div className="mt-2">
              <input type="text" className="py-2 px-3 rounded-lg border border-black/15 outline-none w-full" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">

            <article className="w-full rounded-lg bg-white overflow-hidden">
              <div className="aspect-square bg-slate-100 w-full rounded-lg">
                {/* <Image /> */}
              </div>
              <div className="py-3 px-2">
                <h3 className="text-lg leading-6 font-semibold">Lorem ipsum dolor sit amet conctetur adipisicing elit.</h3>
                <div className="flex text-md gap-3 items-center mt-2">
                  <p className="">$3.0</p>
                  <div className="w-1 h-1 rounded-full bg-black"></div>
                  <p>30 unit left</p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </div>
    </div>
  );
}
