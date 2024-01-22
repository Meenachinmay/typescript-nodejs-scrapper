"use client";

import { useForm } from "react-hook-form";

export default function Scrapping() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);

    const response = await fetch("http://localhost:4000/api/v1/scrapping-site", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    //reset the form
    reset();
  };

  return (
    <>
      <main className="flex flex-col w-full h-screen bg-[#D9D9D9] p-[24px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex flex-col w-full h-[600px] border
         border-dashed border-gray-800 p-[16px] space-y-3"
          >
            {/* INPUT BAR HERE */}
            <div>
              <label className="text-sm tracking-wide">URL INPUT</label>
              <input
                {...register("websiteURL", {
                  required: "A website is required to scrapping the data.",
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: "Enter a valid URL",
                  },
                })}
                className="w-full h-[50px] bg-gray-800 text-slate-200 
            text-md rouneded-lg p-3"
              />
              {errors.websiteUrl && (
                <p className="text-red-500 text-xs italic">"ERROR"</p>
              )}
            </div>

            {/* CSS CLASSES INPUT HERE */}
            <div
              className="flex flex-col w-full h-full border 
          border-dotted border-gray-800 p-[16px] space-y-3"
            >
              <div className="flex flex-col w-full h-[50px] space-y-1">
                <label className="text-[10px] font-bold">CSS FOR TITLE</label>
                <input
                  {...register("titleClass", {
                    required: "Title class is requried",
                  })}
                  className="w-full h-full p-1"
                />
              </div>
              <div className="flex flex-col w-full h-[50px] space-y-1">
                <label className="text-[10px] font-bold">CSS FOR IMAGE</label>
                <input
                  {...register("imageClass", {
                    required: "Image class is required",
                  })}
                  className="w-full h-full p-1"
                />
              </div>

              <div className="flex flex-col w-full h-[50px] space-y-1">
                <label className="text-[10px] font-bold">
                  CSS FOR DESCRIPTION
                </label>
                <input
                  {...register("descriptionClass", {
                    required: "Description class is required.",
                  })}
                  className="w-full h-full p-1"
                />
              </div>
              <div className="flex flex-col w-full h-[50px] space-y-1">
                <label className="text-[10px] font-bold">CSS FOR DATE</label>
                <input
                  {...register("dateClass", {
                    required: "date class is required.",
                  })}
                  className="w-full h-full p-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white text-md p-1 rounded"
            >
              Generate JSON
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

// we will add form functionality in next video

// BYE BYE AND THANK YOU FOR WATCHING
