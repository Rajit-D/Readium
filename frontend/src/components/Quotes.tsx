import React from "react";

const Quotes = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className=" flex justify-center">
        <div className="max-w-md">
          <div className="text-3xl font-bold">
            "The customer service I recieved was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="font-semibold text-xl mt-3">Jules Winnfield</div>
          <div className="font-weight text-slate-500">CEO, ACME Inc.</div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
