"use client";

interface CounterProps {
  count: number;
  add: () => void;
  subtract: () => void;
}

const Counter = ({ count, add, subtract }: CounterProps) => {
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
