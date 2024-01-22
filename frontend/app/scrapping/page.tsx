export default function Scrapping() {
  return (
    <>
      <main className="flex flex-col w-full h-screen bg-[#D9D9D9] p-[24px]">
        <div
          className="flex flex-col w-full h-[600px] border
         border-dashed border-gray-800 p-[16px] space-y-3"
        >
          {/* INPUT BAR HERE */}
          <div>
            <label className="text-sm tracking-wide">URL INPUT</label>
            <input
              className="w-full h-[50px] bg-gray-800 text-slate-200 
            text-md rouneded-lg p-3"
            />
          </div>

          {/* CSS CLASSES INPUT HERE */}
          <div
            className="flex flex-col w-full h-full border 
          border-dotted border-gray-800 p-[16px] space-y-3" 
          >
            <div className="flex flex-col w-full h-[50px] space-y-1">
              <label className="text-[10px] font-bold">CSS FOR TITLE</label>
              <input className="w-full h-full" />
            </div>
            <div className="flex flex-col w-full h-[50px] space-y-1">
              <label className="text-[10px] font-bold">CSS FOR IMAGE</label>
              <input className="w-full h-full" />
            </div>

            <div className="flex flex-col w-full h-[50px] space-y-1">
              <label className="text-[10px] font-bold">CSS FOR DESCRIPTION</label>
              <input className="w-full h-full" />
            </div>
            <div className="flex flex-col w-full h-[50px] space-y-1">
              <label className="text-[10px] font-bold">CSS FOR DATE</label>
              <input className="w-full h-full" />
            </div>
          </div>
          <button className="bg-gray-800 text-white text-md p-1 rounded">
                Generate JSON
          </button>
        </div>
      </main>
    </>
  );
}



// we will add form functionality in next video


// BYE BYE AND THANK YOU FOR WATCHING