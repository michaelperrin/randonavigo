import { parseISO, format } from "date-fns";
import { fr } from "date-fns/locale";

type DateProps = {
  dateString: string;
  className?: string;
};

export default function Date({ dateString, className }: DateProps) {
  const date = parseISO(dateString);
  const extraAttributes: any = {};

  if (className !== null) {
    extraAttributes.className = className;
  }

  return (
    <time dateTime={dateString} {...extraAttributes}>
      {format(date, "d MMMM yyyy", { locale: fr })}
    </time>
  );
}
