import { AllofHealthTableProps } from "@/lib/types";
import { twMerge } from "tailwind-merge";

const AllOfHealthTable = ({
  children,
  labels,
  caption,
  headClassName,
  className,
  icon,
}: AllofHealthTableProps) => {
  return (
    <div className="w-full overflow-x-scroll">
      <table
        className={`z-auto w-full table-auto border-collapse ${
          className ?? ""
        }`}
      >
        <caption className="sr-only">{caption}</caption>
        <thead className={twMerge("h-[3rem] min-w-full", headClassName)}>
          <tr className="">
            {labels?.map((label, id) => (
              <th
                scope="col"
                className={`top-0 bg-inherit text-left text-xs pr-4 lg:text-base font-semibold capitalize w-10 lg:w-auto
              ${labels[0] === label ? "rounded-tl-xl pl-2 lg:pl-7" : ""}  ${
                  labels[labels.length - 1] === label
                    ? "rounded-tr-xl lg:pr-7"
                    : ""
                }`}
                key={id}
              >
                {label}
              </th>
            ))}
            {icon && (
              <th
                scope="col"
                className="w-1/8 sr-only sticky top-0 z-10 text-right"
              >
                <span className="sr-only">{icon}</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className={"max-h-full overflow-auto px-3"}>{children}</tbody>
      </table>
    </div>
  );
};

export { AllOfHealthTable };
