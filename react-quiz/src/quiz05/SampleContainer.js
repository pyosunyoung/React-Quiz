import React from "react";
import "./SampleContainer.css";

function SampleContainer(props) {
  const samples = props.samples;

  return (
    <div className="sample-container5">
      <div className="sample-txt-container5">
        <div style={{gridColumn: "span 5", borderBottom: "1px solid", backgroundColor:"#e0e0e0"}}>보기</div>
        {samples.map((sample, idx) => (
          <div key={idx} className="samples-div5">
            {sample.char}&nbsp;&nbsp;&nbsp;{sample.value}
          </div>
        ))}
      </div>
      <div className="example-div5">
        <p className="example-txt5">예시)</p> <p className="chinese5">二十三</p>{" "}
        <p>+</p> <p className="chinese5">四十六</p> <p>=</p>{" "}
        <p className="chinese5">?</p>
        <p>23</p> <p> </p> <p>46</p> <p> </p> <p>69</p>
      </div>
    </div>
  );
}

export default SampleContainer;
