import dayjs from "dayjs";
import fr from "dayjs/locale/fr";

type DateProps = {
  dateString: string;
  className?: string;
};

export default function Date({ dateString, className }: DateProps) {
  const date = dayjs(dateString).locale(fr);
  const extraAttributes: any = {};

  if (className !== null) {
    extraAttributes.className = className;
  }

  return (
    <time dateTime={dateString} {...extraAttributes}>
      {date.format("DD MMMM YYYY")}
    </time>
  );
}
