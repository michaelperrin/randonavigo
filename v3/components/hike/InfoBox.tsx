import classNames from "classnames";
import "react-18-image-lightbox/style.css";
import {
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InfoBoxProps = {
  type: "info" | "warning";
  children: React.ReactNode;
};

const InfoBox = ({ type, children }: InfoBoxProps) => {
  return (
    <div
      className={classNames("px-8 py-6 mb-4 rounded-sm", {
        "bg-amber-100": type === "warning",
        "bg-sky-100": type === "info",
      })}
    >
      <div className="flex gap-2">
        {type === "info" && (
          <span className="text-sky-700">
            <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
          </span>
        )}
        {type === "warning" && (
          <span className="text-amber-700">
            <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2" />
          </span>
        )}

        <div className="not-prose">{children}</div>
      </div>
    </div>
  );
};

export default InfoBox;
