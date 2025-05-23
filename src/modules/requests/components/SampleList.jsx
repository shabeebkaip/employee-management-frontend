import { useSelector } from "react-redux";
import TableUI from "../../../shared/TableUI";
import SampleRow from "./SampleRow";

const SampleList = () => {
  const { samples } = useSelector((state) => state.requestState); 
  console.log("Samples", samples);

  return (
    <div>
      <TableUI
        tableHeader={[
          "Product Name",
          "Requested By",
          "Email",
          "Quantity",
          "UOM",
          "Status",
          "Action",
        ]}
        noRecord={samples?.length === 0}
      >
        {samples?.map((sample, index) => {
          const isLastRow = index === samples.length - 1;
          return (
            <SampleRow
              isLastRow={isLastRow}
              sample={sample}
              key={index}
              index={index}
            />
          );
        })}
      </TableUI>
    </div>
  );
};

export default SampleList;
