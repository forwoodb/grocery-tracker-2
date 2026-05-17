"use client";

const Counter = ({ count, add, subtract }) => {
  return (
    <div className="flex items-center">
      <button onClick={subtract} className="btn btn-xs mr-1">
        -
      </button>
      {count}
      <button onClick={add} className="btn btn-xs ml-1">
        +
      </button>
    </div>
  );
};

export default Counter;
