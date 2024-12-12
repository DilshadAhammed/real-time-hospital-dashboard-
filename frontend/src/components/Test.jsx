import React from "react";
import { useDispatch, useSelector } from "react-redux";

function test() {
  const value = useSelector((state) => {
    return state.value;
  });
  const dispatch = useDispatch();
  return (
    <div className="m-5">
      <button
        className="bg-slate-400 p-2 border"
        onClick={() => {
            dispatch({
            type: "increment",
          });
        }}
      >
        increment
      </button>
      <label className="m-3">{value}</label>
      <button
        className="bg-slate-400 p-2 border"
        onClick={() => {
            dispatch({
            type: "decrement",
          });
        }}
      >
        decrement
      </button>
    </div>
  );
}

export default test;
