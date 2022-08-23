import React from "react";

const FinderCountries = (props) => {
  return (
    <div>
      find countries <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

export default FinderCountries;
