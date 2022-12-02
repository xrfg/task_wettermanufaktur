import React from "react";
import { timeItems } from "./HourlyList";

const cellClass = "text-sm px-6 py-4 whitespace-nowrap text-center";

export default function HourlyListItem({
  timeItem,
  index,
}: {
  timeItem: timeItems;
  index: number;
}) {
  const formattedDate = new Date(timeItem?.dtg);
  const dateInfo = formattedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <tr className={index % 2 === 0 ? undefined : "bg-blue-50"}>
      <td className={cellClass}>{dateInfo}</td>
      <td className={cellClass}>
        {formattedDate
          .toLocaleTimeString([], {
            hour: "2-digit",
          })
          .toLowerCase()}
      </td>
      <td className={cellClass}>
        {timeItem?.weatherparameters[0]["Temperature [C]"]}&#8451;
      </td>
      <td className={cellClass}>
        {timeItem?.weatherparameters[1]["Wind direction [deg]"]}&#176;
      </td>
      <td className={cellClass}>
        {timeItem?.weatherparameters[2]["Wind speed [m/s]"]} m/s
      </td>
      <td className={cellClass}>
        {timeItem?.weatherparameters[3]["1h precipitation [mm]"]} mm
      </td>
    </tr>
  );
}
